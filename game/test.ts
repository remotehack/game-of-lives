import test from "tape";
import { Board, Pixel, willPixelInteractWithBoard, splitBoard } from "./main";
// import { splitBoard } from "./main";

// https://github.com/substack/tape

test("distanceTo", function (t) {
  t.plan(4);

  const origin: Pixel = new Pixel(0, 0);

  t.equal(Math.sqrt(1), origin.distanceTo(new Pixel(0, 1)));
  t.equal(Math.sqrt(1), origin.distanceTo(new Pixel(0, -1)));
  t.equal(Math.sqrt(2), origin.distanceTo(new Pixel(1, 1)));

  const far: Pixel = new Pixel(300, 300);

  t.equal(Math.sqrt(2), far.distanceTo(new Pixel(301, 299)));
});

test("willPixelsInteractWithBoard", function (t) {
  t.plan(5);

  const board: Board = [
    new Pixel(0, 0),
    new Pixel(0, 1),
    new Pixel(0, 2),
    new Pixel(0, 3),
  ];

  t.equal(true, willPixelInteractWithBoard(board, new Pixel(0, 4)));
  t.equal(false, willPixelInteractWithBoard(board, new Pixel(0, 5)));
  t.equal(true, willPixelInteractWithBoard(board, new Pixel(1, 4)));
  t.equal(true, willPixelInteractWithBoard(board, new Pixel(-1, -1)));
  t.equal(false, willPixelInteractWithBoard(board, new Pixel(320, -3234)));
});

test("willPixelsInteractWithBoard", function (t) {
  t.plan(5);

  const board: Board = [
    new Pixel(0, 0),
    new Pixel(0, 1),
    new Pixel(0, 2),
    new Pixel(0, 3),
  ];

  t.ok(willPixelInteractWithBoard(board, new Pixel(0, 4)));
  t.notOk(willPixelInteractWithBoard(board, new Pixel(0, 5)));
  t.ok(willPixelInteractWithBoard(board, new Pixel(1, 4)));
  t.ok(willPixelInteractWithBoard(board, new Pixel(-1, -1)));
  t.notOk(willPixelInteractWithBoard(board, new Pixel(320, -3234)));
});

test("splitBoard", function (t) {
  t.plan(3);

  const serialse = (b: Board[]) =>
    JSON.stringify(
      b.map((b2) => b2.map((pix) => JSON.stringify(pix)).sort()).sort()
    );

  const areSplitBoardsSame = (b1: Board[], b2: Board[]) =>
    serialse(b1) === serialse(b2);

  t.equal(
    serialse(
      splitBoard([
        new Pixel(0, 0),
        new Pixel(0, 1),
        new Pixel(0, 3),
        new Pixel(0, 4),
      ])
    ),
    serialse([
      [new Pixel(0, 0), new Pixel(0, 1)],
      [new Pixel(0, 3), new Pixel(0, 4)],
    ])
  );

  t.equal(
    serialse(
      splitBoard([
        new Pixel(0, 0),
        new Pixel(0, 1),
        new Pixel(0, 3),
        new Pixel(0, 4),
        new Pixel(0, -1),
      ])
    ),
    serialse([
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, -1)],
      [new Pixel(0, 3), new Pixel(0, 4)],
    ])
  );

  t.equal(
    serialse(
      splitBoard([
        new Pixel(0, 0),
        new Pixel(0, 1),
        new Pixel(0, 3),
        new Pixel(0, 4),
        new Pixel(1, 1),
      ])
    ),
    serialse([
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(1, 1)],
      [new Pixel(0, 3), new Pixel(0, 4)],
    ])
  );
});
