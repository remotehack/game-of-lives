import { Board as pbBoard, Pixel as pbPixel } from "./generated/service_pb";
import { Board, Pixel } from "./main";

export const boardToPb = (board: Board): pbBoard => {
  const pixelList = board.map((p) => {
    const px = new pbPixel();
    px.setX(p.x);
    px.setY(p.y);

    return px;
  });

  const pb = new pbBoard();
  pb.setPixelsList(pixelList);
  return pb;
};

export const PbToBoard = (board: pbBoard): Board =>
  board.getPixelsList().map((px) => new Pixel(px.getX(), px.getY()));

export const printBoard = (board: Board, size = 10) => {
  console.log(board);

  // const xs = board.map((p) => p.x);
  // const ys = board.map((p) => p.y);
  // const xy = new Set(board.map((p) => p.x + "," + p.y));

  // let minX = Math.min.apply(null, xs);
  // let minY = Math.min.apply(null, ys);

  // minX = isFinite(minX) ? minX : 0;
  // minY = isFinite(minY) ? minY : 0;

  // console.log(`[${minX}, ${minY}]`);

  // for (let x = 0; x < size; x++) {
  //   let l = "";
  //   for (let y = 0; y < size; y++) {
  //     if (xy.has(`${minX + x},${minY + y}`)) {
  //       l += "X";
  //     } else {
  //       l += ".";
  //     }
  //   }
  //   console.log(l);
  // }
};
