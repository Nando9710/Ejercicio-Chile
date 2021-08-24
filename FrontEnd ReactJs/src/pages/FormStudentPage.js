import { useHistory, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useFormStudent } from "../hooks/useFormStudent";
import "./FormStudentPage.css";

const citys = [
  "Pinar del Rio",
  "Habana",
  "Matanzas",
  "Mayabeque",
  "Artemisa",
  "Villa Clara",
  "Cienfuegos",
  "Sancti Spiritus",
  "Ciego de Avila",
  "Camaguey",
  "Las Tunas",
  "Granma",
  "Holguin",
  "Santiago de Cuba",
  "Guantanamo",
];

const FormStudentPage = ({ initialFormStudent, groups }) => {
  let params = useParams();

  const { formStudent, error, loading, response, handleChange, handleSubmit } =
    useFormStudent(initialFormStudent, params.accion);

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
          value={formStudent.name}
          required
          className="inputForm"
        />

        <label htmlFor="Age">Escribe la edad</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={formStudent.age}
          required
          className="inputForm"
        />

        <label htmlFor="Sex">Escribe el sexo</label>
        <input
          type="text"
          name="sex"
          onChange={handleChange}
          value={formStudent.sex}
          required
          className="inputForm"
        />

        <label htmlFor="Email">Escribe el email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formStudent.email}
          required
          className="inputForm"
        />

        <label htmlFor="Birth">Escribe el dia de nacimiento</label>
        <input
          type="date"
          name="birth"
          onChange={handleChange}
          value={formStudent.birth}
          required
          className="inputForm"
        />

        <label htmlFor="BirthCity">Escribe la ciudad de nacimiento</label>
        <select
          name="birthCity"
          id="select-search"
          onChange={handleChange}
          className="inputForm"
        >
          <option value="">Ciudades</option>
          {citys.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>

        <label htmlFor="Nombre">Selecciona el Grupo</label>
        <select
          name="group"
          id="select-search"
          onChange={handleChange}
          className="inputForm"
        >
          <option value="">Grupo</option>
          {groups &&
            groups.map((el) => (
              <option key={el._id} value={el.name}>
                {el.name}
              </option>
            ))}
        </select>
        {loading && <Loader />}
        {response && (
          <Message
            msg="Ha sido guardado con exito el estudiante"
            bgColor="green"
          />
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

export default FormStudentPage;
