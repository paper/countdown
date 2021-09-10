import Countdown from './src/countdown.js';

let msgDom = document.getElementById("msg");

// let myCountdown = new Countdown({
//   from: 20
// });

// myCountdown.start({
//   callback(i) {
//     msgDom.innerText = i;

//     // 触发耗时操作
//     let x = 0;
//     while (x < 900000000) {
//       x++;
//     }
//   },
// });

// TODO: 支持多个Demo演示

let myCountdown = new Countdown({
  from: 20
});

myCountdown.start({
  callback(i) {
    msgDom.innerText = i;

    // 触发耗时操作
    let x = 0;
    while (x < 900000000) {
      x++;
    }
  },
});
