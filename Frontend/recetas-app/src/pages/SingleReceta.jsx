import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const SingleReceta = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState({});
  const navigation = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const buscarReceta = async () => {
      const { data } = await axios.get(`http://localhost:8080/recetas/${id}`);
      console.log(data);

      if (!data.ok) {
        setError(true);
        return;
      }
      setReceta(data.data);
    };

    buscarReceta();
  }, [id]);

  const volver = () => {
    navigation(-1);
  };

  const eliminarReceta= async(id) => {

    try {
      Swal.fire({
                title: "¿Estas Seguro?",
                text: "Esta accion es irreversible",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "!Si, Eliminar!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const {data} = await axios.delete(`http://localhost:8080/recetas/${id}`);
                  Swal.fire({
                    text: data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                }
                navigation("/recetas");
              });

      
    } catch (error) {
      console.log(`error en la funcion eliminar recetas ${error.message}`);
    }
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="row">
          <div className="col-md-4">
            <img src={receta.url_imagen} alt="img" className="card-img-top" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="card-title">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-danger" onClick={() => eliminarReceta(id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <strong id="titulo">{receta.pais}</strong>
                <br />
                <br />
                <strong className="text-danger">{receta.titulo}</strong>
              </div>
              <p className="card-text">{receta.instrucciones}</p>

              <a
                href={receta.url_video}
                className="text-danger text-decoration-none"
                target="_blank"
              >
                Conoce como es nuestra preparacion{" "}
                <span>
                  <i className="fa-brands fa-youtube"></i>
                </span>
              </a>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-dark btn-lg text-white float-start mt-4"
                  onClick={() => volver()}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
