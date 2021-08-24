"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log("Servidor perfecto");
// });

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/api-rest-admin-universidad", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Base de datos perfecto");

    // crear servidor
    app.listen(port, () => {
      console.log("Servidor perfecto");
    });
  })
  .catch((error) => console.log("Error"));
