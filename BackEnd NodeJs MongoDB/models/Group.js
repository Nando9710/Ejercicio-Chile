"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = Schema({
  name: String,
  guiaProfesor: String,
  students: [],
});

module.exports = mongoose.model("Group", GroupSchema);
