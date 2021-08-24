import { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Error404 from "./pages/Error404";
import FormGroupPage from "./pages/FormGroupPage";
import FormStudentPage from "./pages/FormStudentPage";
import Home from "./pages/Home";

function App() {
  const [groups, setGroups] = useState(null);
  const [initialFormStudent, setInitialFormStudent] = useState({});
  const [initialFormGroup, setInitialFormGroup] = useState({});

  return (
    <HashRouter>
      <Switch>
        <Route
          path="/formulario_student/:accion"
          children={
            <FormStudentPage
              initialFormStudent={initialFormStudent}
              groups={groups}
            />
          }
        />
        <Route
          path="/formulario_group/:accion"
          children={<FormGroupPage initialFormGroup={initialFormGroup} />}
        />
        <Route
          exact
          path="/"
          children={
            <Home
              groups={groups}
              setGroups={setGroups}
              setInitialFormStudent={setInitialFormStudent}
              setInitialFormGroup={setInitialFormGroup}
            />
          }
        />
        <Route path="*" component={Error404} />
      </Switch>
    </HashRouter>
  );
}

export default App;
