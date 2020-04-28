const express = require("express"),
  app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  // res.send("Hello, Node.js!");
  // res.send(req.query);
  // res.send(req.url);
  // res.send(req.body);
  res.send(req.params);
});


app.listen(app.get("port"), () => {
  console.log(`サーバーはhttp://localhost:${app.get("port")}で起動しています。`);
});