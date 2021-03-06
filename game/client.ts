import { credentials } from "grpc";
import { gameOfLivesClient } from "./generated/service_grpc_pb";
import { Pixel, Board } from "./generated/service_pb";

const solver = (board: Board): Board => {
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  // neighbours

  board.getPixelsList().forEach((pixel) => {
    pixel.setX(pixel.getX() + 1);
  });

  return board;
};

// Connect to gRPC client and
const client = new gameOfLivesClient(
  "localhost:50051",
  credentials.createInsecure()
);
const stream = client.solve();

stream.on("data", (request: Board) => stream.write(solver(request)));
