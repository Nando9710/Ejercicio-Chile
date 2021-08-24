import { useHistory } from "react-router-dom";
import { helpHttp } from "../Helpers/helpHttp";

const TableRow = ({ el, setInitialFormStudent }) => {
  let history = useHistory();
  const handleClickEditarStudent = (e) => {
    e.preventDefault();
    setInitialFormStudent(el);
    history.push("formulario_student/update_student");
  };

  const handleClickEliminarEstudiante = (e) => {
    // e.preventDefault();
    let deleteConfirm = window.confirm(
      "¿Esta seguro que desea eliminar este estudiante?"
    );
    if (deleteConfirm) {
      helpHttp()
        .del(`http://localhost:5000/api/delete_student/${el._id}`)
        .then((res) => {
          if (res.err) {
            alert(`Ha ocurrido un error ${res.status},intentelo de nuevo`);
          } else {
            alert(`Ha sido eliminado correctamente el estudiante ${el.name}`);
            window.location.reload();
          }
        });
    }
  };
  return (
    <tr>
      <td>
        <h3>{el.name}</h3>
      </td>
      <td>
        <button className="editar" onClick={handleClickEditarStudent}>
          Editar
        </button>
        <button className="eliminar" onClick={handleClickEliminarEstudiante}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
