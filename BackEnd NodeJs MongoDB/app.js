"use strict";

// Requires

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

//ejecutar express
var app = express();

//cargar archivos de rutas
var university_routes = require("./routes/university");

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors());

//reescribir rutas
app.use("/api", university_routes);

//exportar modulos
module.exports = app;
