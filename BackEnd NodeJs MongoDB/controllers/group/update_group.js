"use strict";

const Group = require("../../models/Group");

var update_group = (req, res) => {
  var params = req.body;
  Group.findByIdAndUpdate(
    { _id: params._id },
    params,
    { new: true },
    (err, group_updated) => {
      if (err) {
        return res.status(500).send({
          message: "Error al editar el estudiante",
        });
      }

      if (!group_updated) {
        return res.status(200).send({
          message:
            "Algo ha sucedido, no se ha editado el grupo, por favor, repita el proceso",
        });
      } else {
        return res.status(200).send({
          message: "Se ha actualizado correctamente los datos del grupo",
          group_updated,
        });
      }
    }
  );
};

module.exports = update_group;
