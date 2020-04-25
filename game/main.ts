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

  while (remainingPixels.length > 0) {
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
    currentBoard = [remainingPixels.pop()];
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
  prev: Board;
  sent: boolean;
  result: Board;
}

interface IGameState {
  previousState: Board;
  boardsToProcess: IBoardUpdateState[];
  drawnState: Board;
  queue: Promise<Board>[];
}

// // interface IAltGameState {
// //   state: Board[];
// //   next: Map<Board, Board>;
// // }

// // promise queue

// //

// let initialState: Board = [];

let state: IGameState = {
  previousState: initialState,
  boardsToProcess: [
    {
      prev: initialState,
      sent: false,
      result: undefined,
    },
  ],
  drawnState: [],
};

// const nextBoard = async (): Promise<Board> => {
//   while (true) {}
// };

function getNext() {
  return ++itemsTaken;
}

function hasNext() {
  return state.boardsToProcess.some((btp) => btp.sent === false);
}

function reset() {
  itemsReturned = 0;
  itemsTaken = 0;
}

async function getNextAvailableBoard(): Board {
  if (hasNext()) {
    return getNext();
  } else {
    return new Promise(function (resolve) {
      queue.push(function callback(index) {
        resolve(index);
      });
    });
  }
}

function updateBoard(prev: Board, next: Board) {
  itemsReturned++;

  if (itemsReturned >= MAX_ITEMS) {
    reset();
    while (queue.length > 0 && hasNext()) {
      const cb = queue.shift();
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
const draw: IgameOfLivesServer["draw"] = (call) => {
  const { x, y } = call.request.toObject();

  const found = board.some((p) => p.x === x && p.y === y);

  if (!found) {
    board.push(new Pixel(x, y));
  }

  return new Noop();
};

const solve: IgameOfLivesServer["solve"] = async (call) => {
  console.log("Connection", call.getPeer());

  let maxIters = 10;
  while (maxIters--) {
    await new Promise((r) => setTimeout(r, 1000));

    // Send board to client
    const todo = await getNextAvailableBoard();
    const request = boardToPb(todo);
    call.write(request);

    // Wait for response
    const response: pbBoard = await new Promise((resolve) => {
      call.once("data", resolve);
    });

    const done = PbToBoard(response);

    updateBoard(todo, done);

    printBoard(done);
  }
};

if (require.main === module) {
  const server = new Server();

  server.addService(gameOfLivesService, { solve, draw });
  server.bind("0.0.0.0:50051", ServerCredentials.createInsecure());
  server.start();
}
