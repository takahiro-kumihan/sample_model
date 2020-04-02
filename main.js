// for express
const express = require("express"),
      app = express();

// for PORT
app.set("port", process.env.PORT || 3000);

// for ????
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for MODEL
// require MONGOOSE and Collection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/form", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("Mongoose connected to MongoDB!")
// });
// for Promise
mongoose.Promise = global.Promise;

// for Assets
// app.use(express.static("assets"));

// for View and layout
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);

// Difine Path
// for controller
const contactCtl = require("./controllers/contactCtl");
// for ROOT
app.get("/", (req, res) => {
  res.send("Here is ROOT!")
});
// for Contact
app.get("/contact_post", contactCtl.postContact);
app.post("/contact_save", contactCtl.saveContact);
app.get("/contact_get",
         contactCtl.getContact, (req, res) => {
           res.render("contact_get", { Contact: req.data });
         });

// Listen Server
app.listen(app.get("port"), () => {
  console.log(`Server is connected by port:${ app.get("port") }...\nListen...`)});
