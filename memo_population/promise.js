// // 同期処理
// console.log("hello 1");
// console.log("hello 2");
// console.log("hello 3");
// // $ hello1
// // $ hello2
// // $ hello3

// // 非同期処理
// // 1つの処理が終了するのを待たずに、次の処理を実行すること
// // setTimeoutは非同期関数
// // これが行われている状態が『Primise』
// console.log("hello 1");
// setTimeout(() => {
//   console.log("hello 2");
// }, 2000);
// console.log("hello 3");
// // $ hello1
// // $ hello3
// // $ hello2

// // Promiseの例題
// // 所持金（リソース） => 500円
// // 商品金額（係数）=> 100円
// // お釣り（真の場合の結果）=> 所持金 - 商品金額
// function buy(pay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (pay >= 100) {
//         console.log("100円の商品を購入しました。");
//         resolve(pay -100);
//       } else {
//         reject((Error)("error"));
//       }
//     }, 500);
//   });
// }

// buy(500)
//   .then(change => {
//     console.log(`お釣りは${ change }円です。\n`);
//     return buy(change);
//   })
//   .then(change => {
//     console.log(`お釣りは${ change }円です。\n`);
//     return buy(change);
//   })
//   .then(change => {
//     console.log(`お釣りは${ change }円です。\n`);
//     return buy(change);
//   })
//   .then(change => {
//     console.log(`お釣りは${ change }円です。\n`);
//     return buy(change);
//   })
//   .then(change => {
//     console.log(`お釣りは${ change }円です。\n`);
//     return buy(change);
//   })
//   .then(change => {
//     console.log(`お釣りは${ change }円です。\n`);
//     return buy(change);
//   })
//   .catch(() => console.log("お金が足りません。"));

// Promiseは、
// 非同期処理を抽象化したオブジェクトと
// それを操作する仕組みのことをいう。

// // Promiseの例 #1
// function asyncFunc() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("非同期処理を学ぶ")
//     }, 16);
//   });
// }

// asyncFunc()
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// console.log("同期処理が先です。")

// // 単純に「resolve」に文字列を渡しても同じ結果
// // ただ、非同期したい処理をここに書かないと
// // Promiseを生成している意味がない。
// function asyncFunc() {
//   return new Promise((resolve) => {
//     resolve("非同期処理を学ぶ");
//   });
// }

// asyncFunc()
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// console.log("同期処理が先です。")

// // Promiseの例 #2
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = () => {
      if (200 <= req.status && req.status << 300) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}

const url = "https://httpbin.org/get";
// const url = "https://httpbin.org/status/500";

fetchURL(url)
  .then(function onFulfilled(value){
    console.log(value);
  })
  .catch(function onRejected(error){
    console.log(error);
  });