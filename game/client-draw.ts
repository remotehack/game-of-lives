import { credentials } from "grpc";
import { gameOfLivesClient } from "./generated/service_grpc_pb";
import { Pixel, Board } from "./generated/service_pb";

// Connect to gRPC client and
const client = new gameOfLivesClient(
  "localhost:50051",
  credentials.createInsecure()
);

console.log("Sending random points");
for (let i = 0; i < 30; i++) {
  const px = new Pixel();
  px.setX(Math.floor(Math.random() * 20));
  px.setY(Math.floor(Math.random() * 20));

  client.draw(px, (err) => {
    if (err) throw err;
    console.log("→  ", px.toObject());
  });
}
