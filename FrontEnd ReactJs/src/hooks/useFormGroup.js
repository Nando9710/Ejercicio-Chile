import { useState } from "react";
import { helpHttp } from "../Helpers/helpHttp";

export const useFormGroup = (initialFormGroup, accion) => {
  const [formGroup, setFormGroup] = useState(initialFormGroup);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  let url = `http://localhost:5000/api/${accion}`;

  const handleChange = (e) => {
    setFormGroup({
      ...formGroup,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formGroup.guiaProfesor !== "") {
      setLoading(true);
      if (accion === "add_group") {
        helpHttp()
          .post(url, {
            body: formGroup,
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
            body: formGroup,
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

  return { formGroup, error, loading, response, handleChange, handleSubmit };
};
