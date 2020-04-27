// ///////////////////////////////
// moduleのやり方

// exports.PARAMS
// exportsは、module.exporsの略
exports.strings = "Hello, from calc.";

exports.logging = (msg) => {
  console.log(msg);
};

exports.arrayList = (arr) => {
  arr.forEach((i) => {
    console.log(i * i);
  })
}