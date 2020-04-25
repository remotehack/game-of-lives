const MAX_ITEMS = 5;

let itemsTaken = 0;
let itemsReturned = 0;

let queue = [];

async function run(a) {
  while (true) {
    const item = await nextItem();

    console.log("run index " + a, "item " + item);

    const result = await recieve(item);

    update(result);
  }
}

run(1);
run(2);
run(3);
run(4);
run(5);
run(6);
run(7);
run(8);
run(9);
run(10);

async function recieve(a) {
  return await new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a);
    }, 500);
  });
}
