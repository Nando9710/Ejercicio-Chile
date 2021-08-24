"use strict";

var validator = require("validator");
const Group = require("../../models/Group");

var add_group = (req, res) => {
  //coger datos formulario
  var params = req.body;

  // validamos que esten todos los datos necesarios
  try {
    var validate_name = !validator.isEmpty(params.name);
    var validate_guiaProfesor = !validator.isEmpty(params.guiaProfesor);
  } catch (err) {
    return res.status(200).send({
      message: "Faltan datos por enviar",
    });
  }

  // si la la validacion es correcta...
  if (validate_name && validate_guiaProfesor) {
    let groupNew = new Group();

    groupNew.name = params.name;
    groupNew.guiaProfesor = params.guiaProfesor;

    // guardamos el grupo en bd
    Group.findOne({ name: params.name }, (err, groupFind) => {
      if (err) {
        return res.status(500).send({
          message: "Error al encontrar el grupo",
        });
      }

      if (groupFind) {
        return res.status(200).send({
          message:
            "Se ha encntrado un grupo con el mismo nombre, por favor intentelo de nuevo",
        });
      } else {
        groupNew.save((err, groupSaved) => {
          if (err) {
            return res.status(500).send({
              message: "Error al guardar el grupo",
            });
          }

          if (!groupSaved) {
            return res.status(200).send({
              message: "No se ha guardado el grupo",
            });
          } else {
            return res.status(200).send({
              message: "Se agrego correctamente el grupo",
              groupSaved,
            });
          }
        });
      }
    });
  }
};

module.exports = add_group;
