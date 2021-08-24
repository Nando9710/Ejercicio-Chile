"use strict";

const Group = require("../../models/Group");
const Student = require("../../models/Student");

var update_student = (req, res) => {
  // recibimos todos los datos del estudiante que queremos editar
  var params = req.body;

  // buscamos el estudiante para editarlo
  Student.findByIdAndUpdate({ _id: params._id }, params, (err, student_old) => {
    if (err) {
      return res.status(500).send({
        message: "Error al editar el estudiante",
      });
    }

    if (!student_old) {
      return res.status(200).send({
        message:
          "Algo ha sucedido, no se ha editado el estudiante, por favor, repita el proceso",
      });
    } else {
      //IMPORTANTE
      // debo verificar que no cambiaron de grupo al estudiante

      // si sigue en el mismo grupo, solo tendriamos que reemplazarlo
      if (student_old.group === params.group) {
        Group.findOne({ name: params.group }, (err, groupFind) => {
          if (err) {
            return res.status(500).send({
              message: "Error al encontrar el grupo",
            });
          }

          if (!groupFind) {
            return res.status(200).send({
              message:
                "No se ha encntrado el grupo de este estudiante, por favor intentelo de nuevo",
            });
          } else {
            groupFind.students = groupFind.students.map((el) =>
              el._id.toString() === params._id ? params : el
            );

            groupFind.save((err, groupSaved) => {
              if (err) {
                return res.status(500).send({
                  message: "error al guardar el estudiante",
                });
              }

              if (!groupSaved) {
                return res.status(200).send({
                  message: "no se ha guardado el estudiante",
                });
              } else {
                return res.status(200).send({
                  message:
                    "Se actualizaron correctamente los datos del estudiante",
                  groupSaved,
                  params,
                });
              }
            });
          }
        });
      } else {
        //en caso contario, debo ir al grupo nuevo y agregarlo, y luego ir al viejo y borrarlo
        Group.findOne({ name: params.group }, (err, groupFind) => {
          if (err) {
            return res.status(500).send({
              message: "Error al encontrar el grupo",
            });
          }

          if (!groupFind) {
            return res.status(200).send({
              message: "No se ha encontrado el grupo, intentelo de nuevo",
            });
          } else {
            //lo agregamos en el grupo que no estaba
            groupFind.students.push(params);

            // guardamos el grupo
            groupFind.save((err, groupSaved) => {
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
                // si no ha habido problemas para agregar en el grupo, hay que eliminar del otro grupo
                Group.findOne({ name: student_old.group }, (err, groupFind) => {
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
                      (el) => el._id.toString() === params._id
                    );

                    if (student) {
                      // si existe lo eliminamos de la lista
                      groupFind.students.forEach((el) =>
                        el._id.toString() === params._id
                          ? groupFind.students.splice(
                              groupFind.students.indexOf(el)
                            )
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
                            message:
                              "Se actualizo correctamente los datos del estudiante",
                            groupSaved,
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
          }
        });
      }
    }
  });
};

module.exports = update_student;
