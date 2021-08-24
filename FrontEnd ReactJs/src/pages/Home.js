import { useEffect, useState } from "react";
import { helpHttp } from "../Helpers/helpHttp";
import { useFetch } from "../hooks/useFetch";
import "./Home.css";
import NavHome from "../Components/NavHome";
import Table from "../Components/Table";
import { useHistory } from "react-router-dom";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

const initialFormStudentEmpty = {
  name: "",
  age: "",
  sex: "",
  email: "",
  birth: "",
  birthCity: "",
  group: "",
};
const initialFormGroupEmpty = { name: "", guiaProfesor: "" };

const Home = ({
  groups,
  setGroups,
  setInitialFormStudent,
  setInitialFormGroup,
}) => {
  const [selectGroup, setSelectGroup] = useState("");
  const [url, setUrl] = useState(null);

  let history = useHistory();

  const { data, error, loading } = useFetch(url);

  useEffect(() => {
    helpHttp()
      .get("http://localhost:5000/api/get_groups")
      .then((res) => {
        if (!res.err) {
          if (res.groupsFind[0] === undefined) {
            console.log("object");
            setGroups(null);
          } else {
            setGroups(res.groupsFind);
          }
        } else {
          setGroups(null);
        }
      });
  }, []);

  const handleSubmitGroup = (e) => {
    e.preventDefault();
    // llamada get de los grupos
    setUrl(`http://localhost:5000/api/get_group_students/${selectGroup}`);
  };

  const handleChangeSelect = (e) => {
    setSelectGroup(e.target.value);
  };

  const handleAgregraStudentClick = (e) => {
    e.preventDefault();
    setInitialFormStudent(initialFormStudentEmpty);
    history.push("formulario_student/add_student");
  };

  const handleAgregraGroupClick = (e) => {
    e.preventDefault();
    setInitialFormStudent(initialFormGroupEmpty);
    history.push("formulario_group/add_group");
  };

  const handleClickEditarGroup = (e) => {
    e.preventDefault();
    setInitialFormGroup({
      name: data.groupFind.name,
      guiaProfesor: data.groupFind.guiaProfesor,
      _id: data.groupFind._id,
    });
    history.push("formulario_group/update_group");
  };

  const handleClickEliminarGroup = (e) => {
    // e.preventDefault();
    let deleteConfirm = window.confirm(
      "¿Esta seguro que desea eliminar este grupo?"
    );
    if (deleteConfirm) {
      helpHttp()
        .del(`http://localhost:5000/api/delete_group/${data.groupFind.name}`)
        .then((res) => {
          if (res.err) {
            alert(`Ha ocurrido un error ${res.status},intentelo de nuevo`);
          } else {
            alert(
              `Ha sido eliminado correctamente el estudiante ${data.groupFind.name}`
            );
            window.location.reload();
          }
        });
    }
  };

  return (
    <>
      <NavHome
        handleChangeSelect={handleChangeSelect}
        handleSubmitGroup={handleSubmitGroup}
        handleAgregraGroupClick={handleAgregraGroupClick}
        groups={groups}
      />

      {loading && <Loader />}

      <div>
        {data && (
          <div>
            <div className="encabezado-tabla">
              <div className="datos-grupo">
                <h2>Grupo: {data.groupFind.name}</h2>
                <h2>Profesor Guia: {data.groupFind.guiaProfesor}</h2>
              </div>
              <div className="botones-grupo">
                <button className="editar" onClick={handleClickEditarGroup}>
                  Editar Grupo
                </button>
                <button className="eliminar" onClick={handleClickEliminarGroup}>
                  Eliminar Grupo
                </button>
              </div>
            </div>
            <div className="agregar-estudiante">
              <button className="agregar" onClick={handleAgregraStudentClick}>
                Agregar estudiante
              </button>
            </div>

            <Table
              students={data.groupFind.students}
              setInitialFormStudent={setInitialFormStudent}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
