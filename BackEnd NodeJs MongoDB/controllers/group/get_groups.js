"use strict";

const Group = require("../../models/Group");

const get_groups = (req, res) => {
  // Buscamos todos los grupos para mostrarlos
  Group.find((err, groupsFind) => {
    if (err) {
      return res.status(500).send({
        message: "Error al encontrar el grupo",
      });
    }

    if (!groupsFind) {
      return res.status(200).send({
        message: "No hay ningun grupo con ese nombre",
      });
    } else {
      return res.status(200).send({
        message: "Grupo encontrado",
        groupsFind,
      });
    }
  });
  // return res.status(200).send({
  //   message: "Estudiante encontrado",
  //   data,
  // });
};

module.exports = get_groups;
