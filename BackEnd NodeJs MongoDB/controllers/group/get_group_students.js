"use strict";

const Group = require("../../models/Group");

const get_group_students = (req, res) => {
  var name = req.params.name;

  Group.findOne({ name: name }, (err, groupFind) => {
    if (err) {
      return res.status(500).send({
        message: "Error al encontrar el grupo",
      });
    }

    if (!groupFind) {
      return res.status(200).send({
        message: "No hay ningun grupo con ese nombre",
      });
    } else {
      return res.status(200).send({
        message: "Grupo encontrado",
        groupFind,
      });
    }
  });
};

module.exports = get_group_students;
