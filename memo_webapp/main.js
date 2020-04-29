const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3000);

// // get POST data
// // POSTリクエストで渡されたbodyのデータを
// // 利用するには『body-parser』モジュールが必要。
// app.use(bodyParser.urlencoded({ extended: true }));
// app.post("/hello", (req, res) => {
//   res.send(`Hello, ${ req.body.ins }`);
// });
// // 結果は、
// // $ curl -X POST --data 'ins=takahiro' http://localhost:3000/hello
// // $ => Hello, takahirodev

// // get Path params
// app.get("/hello/:ins", (req, res) => {
//   res.send(`Hello, Node.js and ${ req.params.ins }`);
// });
// // 結果は、
// // ブラウザに『http://localhost:3000/hello/takahiro』
// // => 『Hello, Node.js and takahiro』
// // ターミナルで、
// // $ curl "http://localhost:3000/hello/takahiro"
// // $ => 『Hello, Node.js and takahirodev』


// // get Query params
// app.get("/hello", (req, res) => {
//   res.send(`Hello, Node.js and ${ req.query.ins }`);
// });
// // 結果は、
// // ブラウザに『http://localhost:3000/hello?ins=takahiro』
// // => 『Hello, Node.js and takahiro』
// // ターミナルで、
// // $ curl "http://localhost:3000/hello?ins=takahiro"
// // $ => 『Hello, Node.js and takahirodev』
// // 『?ins = takahiro』これがQuery

app.listen(app.get("port"), () => {
  console.log(`サーバーはhttp://localhost:${app.get("port")}で起動しています。`);
});