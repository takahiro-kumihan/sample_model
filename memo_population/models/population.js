const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const personSchema = Schema({
  name: String,
  group: { type: Schema.Types.ObjectId, ref: "Unit"}
});

const unitSchema = Schema({
  name: String,
  member: [{ type: Schema.Types.ObjectId, ref: "Person" }]
});

const compositionSchema = Schema({
  title: String,
  performer: { type: Schema.Types.ObjectId, ref: "Unit" },
  fev: [{ type: Schema.Types.ObjectId, ref: "Person" }]
});

exports.Person = mongoose.model("Person", personSchema);
exports.Unit = mongoose.model("Unit", unitSchema);
exports.Composition = mongoose.model("Composition", compositionSchema);