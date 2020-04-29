// ///////////////////////////////
// moduleを受ける
let calc = require("./calc");

console.log(calc.strings);

calc.logging("Hello, from repl.");

let arr = [1, 2, 3, 4, 5];
calc.arrayList(arr);