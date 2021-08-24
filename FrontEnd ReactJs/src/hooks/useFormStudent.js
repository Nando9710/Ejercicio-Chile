import { useState } from "react";
import { helpHttp } from "../Helpers/helpHttp";

export const useFormStudent = (initialFormStudent, accion) => {
  const [formStudent, setFormStudent] = useState(initialFormStudent);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  console.log(accion);

  let url = `http://localhost:5000/api/${accion}`;

  const handleChange = (e) => {
    setFormStudent({
      ...formStudent,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formStudent.group !== "" && formStudent.birthCity !== "") {
      console.log(formStudent);
      setLoading(true);
      if (accion === "add_student") {
        helpHttp()
          .post(url, {
            body: formStudent,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
            if (res.err) {
              setError(res);
              setResponse(false);
              setTimeout(() => {
                setResponse(false);
              }, 5000);
            } else {
              setResponse(true);
              setError(null);
              setTimeout(() => {
                setResponse(false);
              }, 5000);
            }
          });
      } else {
        helpHttp()
          .put(url, {
            body: formStudent,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
            if (res.err) {
              setError(res);
              setResponse(false);
              setTimeout(() => {
                setResponse(false);
              }, 5000);
            } else {
              setResponse(true);
              setError(null);
              setTimeout(() => {
                setResponse(false);
              }, 5000);
            }
          });
      }
    }
  };

  return { formStudent, error, loading, response, handleChange, handleSubmit };
};
