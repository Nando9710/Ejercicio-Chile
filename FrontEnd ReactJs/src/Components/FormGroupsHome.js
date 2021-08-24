const FormGroupsHome = ({
  handleChangeSelect,
  handleSubmitGroup,
  handleAgregraGroupClick,
  groups,
}) => {
  return (
    <form onSubmit={handleSubmitGroup} className="form-group-home">
      <select
        name="select-search-group"
        id="select-search-home"
        onChange={handleChangeSelect}
      >
        <option value="">Selecciona un grupo</option>
        {groups &&
          groups.map((el) => (
            <option key={el._id} value={el.name}>
              {el.name}
            </option>
          ))}
      </select>
      <input type="submit" value="Seleccionar" className="seleccionar" />
      <button className="agregar" onClick={handleAgregraGroupClick}>
        Agregar Grupo
      </button>
    </form>
  );
};

export default FormGroupsHome;
