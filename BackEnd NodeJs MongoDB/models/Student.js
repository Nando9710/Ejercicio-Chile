"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = Schema({
  name: String,
  age: Number,
  sex: String,
  email: String,
  birth: String,
  birthCity: String,
  group: String,
});
module.exports = mongoose.model("Student", StudentSchema);
