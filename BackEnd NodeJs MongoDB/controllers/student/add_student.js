"use strict";

var validator = require("validator");
const Group = require("../../models/Group");
const Student = require("../../models/Student");

var add_student = (req, res) => {
  //coger datos formulario
  var params = req.body;
  console.log(params);

  // validamos que esten todos los datos necesarios
  try {
    var validate_name = !validator.isEmpty(params.name);
    var validate_age = !validator.isEmpty(params.age);
    var validate_sex = !validator.isEmpty(params.sex);
    var validate_email =
      !validator.isEmpty(params.email) && validator.isEmail(params.email);
    var validate_birth = !validator.isEmpty(params.birth);
    var validate_birthCity = !validator.isEmpty(params.birthCity);
    var validate_group = !validator.isEmpty(params.group);
  } catch (err) {
    return res.status(200).send({
      message: "Faltan datos por enviar o el Email esta mal escrito",
      validate_name,
      validate_age,
      validate_sex,
      validate_email,
      validate_birth,
      validate_birthCity,
      validate_group,
    });
  }

  //si sin validos...
  if (
    validate_name &&
    validate_age &&
    validate_sex &&
    validate_email &&
    validate_birth &&
    validate_birthCity &&
    validate_group
  ) {
    var studentNew = new Student();

    studentNew.name = params.name;
    studentNew.age = params.age;
    studentNew.sex = params.sex;
    studentNew.email = params.email;
    studentNew.birth = params.birth;
    studentNew.birthCity = params.birthCity;
    studentNew.group = params.group;

    // guardamos el estudiante en bd

    // primero buscamos que el grupo exista
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
        // si existe guardamos el estudiante en su tabla de estudiantes
        studentNew.save((err, studentSaved) => {
          if (err) {
            return res.status(500).send({
              message: "Error al guardar el estudiante",
            });
          }

          if (!studentSaved) {
            return res.status(200).send({
              message: "No se ha guardado el estudiante, intentelo de nuevo",
            });
          } else {
            // y lo guargamos en el arreglo de estudiantes del grupo encontrado
            groupFind.students.push(studentSaved);

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
                return res.status(200).send({
                  message: "Se agrego correctamente el estudiante",
                  studentSaved,
                  groupSaved,
                });
              }
            });
          }
        });
      }
    });
  }
};

module.exports = add_student;
