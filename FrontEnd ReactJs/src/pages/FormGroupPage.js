import { useHistory, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useFormGroup } from "../hooks/useFormGroup";

const profesors = [
  "Abel",
  "Patricia",
  "Pedro",
  "Veronica",
  "Amanda",
  "Beatriz",
  "Yanet",
  "Alejandro",
  "Camila",
  "Claudia",
  "David",
];
const FormGroupPage = ({ initialFormGroup }) => {
  let params = useParams();

  const { formGroup, error, loading, response, handleChange, handleSubmit } =
    useFormGroup(initialFormGroup, params.accion);
  let history = useHistory();

  return (
    <div>
      <nav>
        <button onClick={() => history.push("")}>Atras</button>
      </nav>

      <form onSubmit={handleSubmit} className={"form-students"}>
        <label htmlFor="Nombre">Escribe el nombre</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formGroup.name}
          required
          className="inputForm"
        />

        <label htmlFor="guiaProfesor">Escoja un profesor para el grupo</label>
        <select
          name="guiaProfesor"
          id="select-search"
          onChange={handleChange}
          className="inputForm"
        >
          <option value="">Profesores</option>
          {profesors.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>

        {loading && <Loader />}

        {response && (
          <Message msg="Ha sido guardado con exito el grupo" bgColor="green" />
        )}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        <input type="submit" value="Guardar" id="guardar" />
      </form>
    </div>
  );
};

export default FormGroupPage;
