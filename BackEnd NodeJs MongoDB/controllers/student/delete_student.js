"use strict";

const Group = require("../../models/Group");
const Student = require("../../models/Student");

var delete_student = (req, res) => {
  const id = req.params.id;
  console.log(typeof id);

  Student.findByIdAndDelete({ _id: id }, (err, student_deleted) => {
    if (err) {
      return res.status(500).send({
        message: "error al eliminar el estudiante",
      });
    }

    if (!student_deleted) {
      return res.status(200).send({
        message:
          "Algo ha sucedido, no se ha eliminado el estudiante, por favor, repita el proceso",
      });
    } else {
      // tengo que eliminar el estudiante del arreglo del grupo tambien
      Group.findOne({ name: student_deleted.group }, (err, groupFind) => {
        if (err) {
          return res.status(500).send({
            message: "Error al encontrar el grupo",
          });
        }

        if (!groupFind) {
          return res.status(200).send({
            message:
              "Algo ha sucedido, no se ha encontrado el grupo, por favor, repita el proceso",
          });
        } else {
          // verificamos que el estudiante exista en ese grupo
          let student = groupFind.students.filter(
            (el) => el._id.toString() === id
          );

          if (student) {
            // si existe lo eliminamos de la lista
            groupFind.students.forEach((el) =>
              el._id.toString() === id
                ? groupFind.students.splice(groupFind.students.indexOf(el))
                : el
            );

            groupFind.save((err, groupSaved) => {
              if (err) {
                return res.status(500).send({
                  message: "Error al borrar el estudiante del grupo",
                });
              }

              if (!groupSaved) {
                return res.status(200).send({
                  message: "No se ha borrado el estudiante del grupo",
                });
              } else {
                return res.status(200).send({
                  message: "Se elimino correctamente el estudiante del grupo",
                  student_deleted,
                  groupFind,
                });
              }
            });
          } else {
            return res.status(200).send({
              message:
                "Este estudinante no existe en este grupo, algo anda mal",
            });
          }
        }
      });
    }
  });
};

module.exports = delete_student;
