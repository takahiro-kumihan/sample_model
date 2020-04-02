// for express
const express = require("express"),
      app = express();

// for PORT
app.set("port", process.env.PORT || 3000);

// for ????
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for Assets
// app.use(express.static("assets"));

// for View and layout
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);

// Difine Path
// for controller
const formCtl = require("./controllers/formCtl");
// for ROOT
app.get("/", (req, res) => {
  res.send("Here is ROOT!")
});
// for Contact
app.get("/contact_post", formCtl.postForm);
app.get("/contact_save", formCtl.saveForm);
app.get("/contact_get",
         formCtl.getForm, (req, res) => {
           res.render("contact_get", { Contact, req.data });
         });

// Listen Server
app.listen(app.get("port"), () => {
  console.log(`Server is connected by port:${ app.get("port") }...\nListen...`)});
