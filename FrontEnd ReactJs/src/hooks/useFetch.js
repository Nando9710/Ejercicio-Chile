import { useState, useEffect } from "react";

export const useFetch = (url) => {
  // Ver videos de useFetch para ver el funcionamiento de este hook
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          let err = new Error("Error en la peticion fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrio un error";
          throw err;
        }
        const json = await res.json();

        if (!signal.abort) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        if (!signal.abort) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.abort) {
          setLoading(false);
          console.log(data);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
};
