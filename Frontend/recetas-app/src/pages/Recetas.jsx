import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logoblanco from "../img/logoblanco.png"


export const Recetas = () => {
  const navigation = useNavigate();
  const [recetas, setRecetas] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  let [searchParams] = useSearchParams();

  const limpiar = useCallback(() => {
    setRecetas([]);
    setInputSearch("");
    navigation("");
  }, [navigation]);

  useEffect(() => {
    const titulo = searchParams.get("titulo") || "";
    if (titulo === "") {
      return limpiar();
    }
    setInputSearch(titulo);
    obtenerRecetas(titulo);
  }, [searchParams, limpiar]);

  const obtenerRecetas = async (titulo) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/recetas?titulo=" + titulo
      );
      setRecetas(data.data);
    } catch (error) {
      console.log("error en obtener recetas", error.message);
    }
  };

  const buscar = (e) => {
    if (e.target.value === "") {
      return limpiar();
    }
    setInputSearch(e.target.value);
    //obtenerRecetas(e.target.value);
    navigation("?titulo=" + e.target.value);
  };

  return (
    <div>
      <section className="col-xxl-8 form-group mx-auto mt-5">
        <h1 className="text-center text-white">TÚ RECETA PREFERIDA</h1>

        <div className="container">
        <input
          type="text"
          placeholder="Buscar receta"
          className="form-control mt-5"
          value={inputSearch}
          onChange={(e) => buscar(e)}
        />
        </div>

        <div className="d-flex justify-content-center">
        {inputSearch === '' && (
        <img src={logoblanco} alt="imagen" className="img-fluid center-image"/>
        )}
        </div>
      </section>

      <section className="row">
        {recetas ? (
          recetas.map((receta) => (
            <Link
              key={receta.id}
              to={`/recetas/${receta.id}`}
              className="col-md-4 my-3 text-decoration-none"
            >
              <div className="card">
                <div className="card-header">
                  <img
                    src={receta.url_imagen}
                    alt="img"
                    className="img-fluid"
                  />
                  <div className="card-body">
                    <h3 className="text-dark text-center">{receta.titulo}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-white mt-5">
            <h1>Receta no encontrada</h1>
            <strong>{inputSearch}</strong>
          </div>
        )}
      </section>
    </div>
  );
};
