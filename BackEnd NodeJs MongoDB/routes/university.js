"use strict";

var express = require("express");

// funciones
const get_student = require("../controllers/student/get_student");
const get_groups = require("../controllers/group/get_groups");
const get_group_students = require("../controllers/group/get_group_students");
const add_student = require("../controllers/student/add_student");
const add_group = require("../controllers/group/add_group");
const delete_student = require("../controllers/student/delete_student");
const delete_group = require("../controllers/group/delete_group");
const update_group = require("../controllers/group/update_group");
const update_student = require("../controllers/student/update_student");

var router = express.Router();

// rutas
router.get("/get_student/:id", get_student);
router.post("/add_student", add_student);
router.post("/add_group", add_group);
router.get("/get_groups", get_groups);
router.get("/get_group_students/:name", get_group_students);
router.put("/update_student", update_student);
router.put("/update_group", update_group);
router.delete("/delete_student/:id", delete_student);
router.delete("/delete_group/:name", delete_group);

module.exports = router;
