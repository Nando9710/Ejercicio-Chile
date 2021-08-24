import TableRow from "./TableRow";

const Table = ({ students, setInitialFormStudent }) => {
  return (
    <div className="div-table">
      <table>
        <thead>
          <tr>
            <th>
              <h2>Nombre</h2>
            </th>
            <th>
              <h2>Accion</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((el) => (
            <TableRow
              key={el._id}
              el={el}
              setInitialFormStudent={setInitialFormStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
