"use strict";

const Student = require("../../models/Student");

const get_student = (req, res) => {
  const id = req.params.id;

  Student.findById({ _id: id }, (err, studentFind) => {
    if (err) {
      return res.status(500).send({
        message: "Error al encontrar el estudiante",
      });
    }

    if (!studentFind) {
      return res.status(200).send({
        message:
          "No se encontro el estudiante, algo fallo, vuelve a intentarlo",
      });
    } else {
      return res.status(200).send({
        message: "Estudiante encontrado",
        studentFind,
      });
    }
  });
  // return res.status(200).send({
  //   message: "Estudiante encontrado",
  //   data,
  // });
};

module.exports = get_student;
