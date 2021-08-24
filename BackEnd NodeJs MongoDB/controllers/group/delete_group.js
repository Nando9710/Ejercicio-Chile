"use strict";

const Group = require("../../models/Group");

var delete_group = (req, res) => {
  const name = req.params.name;
  Group.findOneAndDelete({ name: name }, (err, group_deleted) => {
    if (err) {
      return res.status(500).send({
        message: "Error al eliminar el grupo",
      });
    }

    if (!group_deleted) {
      return res.status(200).send({
        message:
          "Algo ha sucedido, no se ha eliminado el grupo, por favor, repita el proceso",
      });
    } else {
      return res.status(200).send({
        message: "Se elimino correctamente el grupo con todos sus estudiantes",
        group_deleted,
      });
    }
  });
};

module.exports = delete_group;
