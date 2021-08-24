import FormGroupsHome from "./FormGroupsHome";

const NavHome = ({
  handleChangeSelect,
  handleSubmitGroup,
  handleAgregraGroupClick,
  groups,
}) => {
  return (
    <nav>
      <div>
        {groups ? (
          <h1>Escoja el grupo que desea ver</h1>
        ) : (
          <h1>No existen grupos todavia</h1>
        )}
      </div>
      <FormGroupsHome
        handleChangeSelect={handleChangeSelect}
        handleSubmitGroup={handleSubmitGroup}
        handleAgregraGroupClick={handleAgregraGroupClick}
        groups={groups}
      />
    </nav>
  );
};

export default NavHome;
