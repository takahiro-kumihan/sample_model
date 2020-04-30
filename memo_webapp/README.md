# my study Node.js memo

## REPL command

* .break    Sometimes you get stuck, this gets you out
* .clear    Alias for .break
* .editor   Enter editor mode
* .exit     Exit the repl
* .help     Print this help message
* .load     Load JS from a file into the REPL session
* .save     Save all evaluated commands in this REPL session to a file


* req.body
  * request bodyのkey-valueペア(body-parser middlewareが必要)
* req.cookies
  * cookieのkey-valueペア(cookie-parser middlewareが必要)
* req.params
  * /books/:idで/books/1の場合req.params.id => 1
  * url pathパラメータのkey-valueペア
* req.query
  * /books?order=ascの場合req.query.order => asc
  * リクエストパラメータのkey-valueペア
* req.get
  * HTTPヘッダーの値を取得する
* req.session
  * セッションのkey-valueペア(express-session middlewareが必要)