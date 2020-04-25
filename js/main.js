const { credentials } = require("grpc");
const { gameOfLivesClient } = require("./generated/service_grpc_pb");
const { Pixel } = require("./generated/service_pb");

const neighbours = (x, y) => [
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
  [x - 1, y],
  // [x, y],
  [x + 1, y],
  [x - 1, y + 1],
  [x, y + 1],
  [x + 1, y + 1],
];

const solver = (board) => {
  console.log("<<", board.toObject());
  // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  const counts = new Map();

  for (let pixel of board.getPixelsList()) {
    const { x, y } = pixel.toObject();
    for (let [nx, ny] of neighbours(x, y)) {
      const key = nx + "." + ny;
      const prev = counts.get(key) || 0;
      counts.set(key, prev + 1);
    }
  }
  for (const [key, count] of Object.entries(counts)) {
    if (count === 2 || count === 3) {
      let [x, y] = key.split(".").map(parseFloat);
      const pixel = new Pixel();
      pixel.setX(x);
      pixel.setY(y);

      board.addPixels(pixel);
    }
  }

  console.log(">>>>>", board.toObject());

  console.log("🙌🙌🙌🙌");

  return board;
};

// Connect to gRPC client and
const client = new gameOfLivesClient(
  "localhost:50051",
  credentials.createInsecure()
);
const stream = client.solve();

stream.on("data", (request) => stream.write(solver(request)));
