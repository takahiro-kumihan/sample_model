const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const employeeSchma = Schema({
  name: String,
  unit: { type: Schema.Types.ObjectId, ref: "Unit"}
});

const unitSchema = Schema({
  name: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }]
});

exports.Employee = mongoose.model("Employee", employeeSchma);
exports.Unit = mongoose.model("Unit", unitSchema);