const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3000);

// send POST JSON
// HTTPのPOSTリクエストは、基本的になんでも送信できる。
// HTTPヘッダのContent-Typeにどんなデータを送信するかを記載して、Content-Lengthにボディー部の長さを記載すれば、あとはボディー部にはそのバイト数分だけであれば、何を突っ込んでもよい。
// HTTPリクエストを受け取ったサーバー側は、それを適切に解釈して、意味のあるアクションを起こす。
// ReactなどのSPAアプリケーションとサーバー側のアプリケーションのやり取りでは通常、JSON形式のデータを比較的頻繁にやり取りする。この時、Content-Typeにapplication/jsonなどとセットして、出来上がったデータのバイト数をContent-Lengthにセットして送る。
// * JSONを使用する利点は、
// * JSONはブラウザ上のJavaScriptでもデータを作りやすい。
// * 読みやすい。
// * データは軽い。
app.use(bodyParser.json());
// // #01
app.post("/hello", (req, res) => {
  console.log(req.body);
});
// => Postmanを使ってPOSTをテストする。

// // #02
// app.post('/hello', (req, res) => {
//   res.send(`${req.body.name} is ${req.body.age }\n`);
// });
// // ターミナルで以下を実行する。
// // $ curl -X POST -H 'Content-Type: application/json; charset=UTF-8' http://localhost:3000/hello -d '{"name": "takahiro", "age": 55}'
// // $ takahiro is 55

// // send POST data
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