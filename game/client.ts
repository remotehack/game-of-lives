import { credentials } from "grpc";
import { gameOfLivesClient } from "./generated/service_grpc_pb";
import { Pixel, Board } from "./generated/service_pb";

const solver = (board: Board): Board => {
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
