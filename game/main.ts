// handle internal state of game

export class Pixel {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(that: Pixel): number {
    return Math.sqrt(
      Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2)
    );
  }
}

export type Board = Pixel[];

// start grpc service

// logic of sending tiles to people

export function splitBoard(boardToSplit: Board): Board[] {
  let remainingPixels = [...boardToSplit];

  const boards = [];

  let currentBoard: Board = [remainingPixels.pop()];

  while (true) {
    while (true) {
      let interacted = false;

      for (let i = 0; i < remainingPixels.length; i++) {
        const pixel = remainingPixels[i];
        if (willPixelInteractWithBoard(currentBoard, pixel)) {
          remainingPixels.splice(i, 1);

          currentBoard.push(pixel);

          interacted = true;
        }
      }

      if (!interacted) {
        break;
      }
    }

    boards.push(currentBoard);

    const poppedPixel = remainingPixels.pop();

    if (poppedPixel === undefined) {
      break;
    }
    currentBoard = [poppedPixel];
  }

  return boards;
}

export function willPixelInteractWithBoard(
  board: Board,
  pixelToCheck: Pixel
): boolean {
  /*
   * Check if any pixel is neighbouring using euclidean distance. The
   * distance to any neighbour shouldn't be more than sqrt(2).
   */
  return board.some((p) => p.distanceTo(pixelToCheck) <= Math.SQRT2);
}

interface IBoardUpdateState {
  board: Board;
  sent: boolean;
  result: Board;
}

interface IGameState {
  boardsToProcess: IBoardUpdateState[];
  drawnState: Board;
  queue: ((board: Board) => void)[];
}

let initialState: Board = [];

let state: IGameState = {
  boardsToProcess: [
    {
      board: initialState,
      sent: false,
      result: undefined,
    },
  ],
  drawnState: [],
  queue: [],
};

function getNext() {
  const next = state.boardsToProcess.find((btp) => btp.sent === false);
  next.sent = true;
  return next.board;
}

function hasNext() {
  return state.boardsToProcess.some((btp) => btp.sent === false);
}

function reset() {
  let before = state.boardsToProcess.length;

  const nextBoard: Board = state.boardsToProcess
    .map((b) => b.result)
    .reduce((prev, curr) => prev.concat(curr), []);

  const nextBoardWithDraw = nextBoard.concat(state.drawnState);

  state.drawnState = [];
  state.boardsToProcess = splitBoard(nextBoardWithDraw).map((b) => ({
    board: b,
    sent: false,
    result: undefined,
  }));

  printBoard(nextBoardWithDraw, 35);
}

async function getNextAvailableBoard(): Promise<Board> {
  if (hasNext()) {
    return Promise.resolve(getNext());
  } else {
    return new Promise(function (resolve) {
      state.queue.push(function callback(index) {
        resolve(index);
      });
    });
  }
}

function updateBoard(prev: Board, next: Board) {
  const btp = state.boardsToProcess.find((b) => b.board === prev);
  btp.result = next;

  if (state.boardsToProcess.every((b) => b.result !== undefined)) {
    reset();
    while (state.queue.length > 0 && hasNext()) {
      const cb = state.queue.shift();
      cb(getNext());
    }
  }
}

// grpc server stuff
// const server = new
import { Server, ServerCredentials } from "grpc";
import {
  gameOfLivesService,
  IgameOfLivesServer,
} from "./generated/service_grpc_pb";
import { Noop, Board as pbBoard } from "./generated/service_pb";
import { boardToPb, PbToBoard, printBoard } from "./helpers";

// Set a pixel to the board
const draw: IgameOfLivesServer["draw"] = (call, callback) => {
  const { x, y } = call.request.toObject();

  console.log("drawing", x, y);

  const found = state.drawnState.some((p) => p.x === x && p.y === y);

  if (!found) {
    state.drawnState.push(new Pixel(x, y));
  }

  callback(null, new Noop());
};

const solve: IgameOfLivesServer["solve"] = async (call) => {
  console.log("Connection", call.getPeer());

  while (true) {
    await new Promise((r) => setTimeout(r, 50));

    // Send board to client
    const todo = await getNextAvailableBoard();
    const request = boardToPb(todo);
    call.write(request);

    // Wait for responses
    const response: pbBoard = await new Promise((resolve) => {
      call.once("data", resolve);
    });

    const done = PbToBoard(response);

    updateBoard(todo, done);

    // console.log("updated", todo, "->", done);
  }

  // call.end();
};

if (require.main === module) {
  const server = new Server();

  server.addService(gameOfLivesService, { solve, draw });
  server.bind("0.0.0.0:50051", ServerCredentials.createInsecure());
  server.start();
}
