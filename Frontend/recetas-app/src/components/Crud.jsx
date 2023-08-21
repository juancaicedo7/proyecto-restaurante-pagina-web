import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Crud = () => {
  const [recetas, setRecetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIdEdit] = useState(false);
  const navigation = useNavigate();
  const [categoriaData, setCategoriaData] = useState("");
  const [recetaForm, setRecetaForm] = useState();

  useEffect(() => {
    obtenerRecetas();
  }, []);

  const obtenerRecetas = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:8080/recetas");
      setRecetas(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`error en la funcion obtener recetas ${error.message}`);
    }
  };

  const eliminarReceta = async (id) => {
    try {
      Swal.fire({
        title: "¿Estas Seguro?",
        text: "Esta accion es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "!Si, Eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          const { data } = await axios.delete(
            `http://localhost:8080/recetas/${id}`
          );
          obtenerRecetas();
          setIsLoading(false);
          Swal.fire({
            text: data.message,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.log(`error en la funcion eliminar recetas ${error.message}`);
    }
  };

  const ejecutarFormulario = () => {
    e.preventDefault();

    isEdit ? actualizarReceta() : guardarReceta();
    setIdEdit(false);
    setRecetaForm(initialState);
  };

  const guardarReceta = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/recetas",
        recetaForm
      );
      obtenerRecetas();
      Swal.fire({
        icon: "success",
        text: data.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      if (!error.response.data.ok) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      console.log(`error en la funcion guardarReceta ${error.message}`);
    }
  };

  const guardarCategoria = async () => {
    try {
      await axios.post("http://localhost:8080/categorias", {
        nombre: categoriaData,
      });
      Swal.fire({
        icon: "success",
        title: "Receta guardada con exito",
        showConfirmButton: false,
        timer: 2000,
      });
      navigation("/crud");
    } catch (error) {
      console.log(error);
      console.log(`error en la funcion guardarCategoria ${error.message}`);
    }
  };

  const actualizarReceta = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/recetas/${recetaForm.id}`,
        recetaForm
      );
      obtenerRecetas();
      Swal.fire({
        icon: "success",
        text: data.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      if (!error.response.data.ok) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      console.log(`error en la funcion actualizarReceta ${error.message}`);
    }
  };

  const obtenerData = (receta) => {
    setRecetaForm(receta);
    setIdEdit(true);
  };

  return (
    <div className="container mt-5">
      <div className="modal" id="mi-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <strong>
                <h1 className="modal-title">Agregar Categoria</h1>
              </strong>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar categoria"
                onChange={(e) => setCategoriaData(e.target.value)}
                required
              ></input>
            </div>

            <div className="modal-footer">
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => guardarCategoria()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="mi-modal2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <strong>
                <h1 className="modal-title">Actualizar Categoria</h1>
              </strong>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Categoria</label>
              <input
                type="text"
                className="form-control"
                // onChange={(e) => setCategoriaData(e.target.value)}
                required
              ></input>
              </div>

              <div className="mb-3">
                <label className="form-label">Pais</label>
                <input
                  type="text"
                  className="form-control"
                  name="pais"
                  // onChange={(e) => asignarCampos(e)}
                  required
                  // value={data.pais}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Titulos</label>
                <input
                  type="text"
                  className="form-control"
                  name="pais"
                  // onChange={(e) => asignarCampos(e)}
                  required
                  // value={data.pais}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">URL Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="pais"
                  // onChange={(e) => asignarCampos(e)}
                  required
                  // value={data.pais}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">URL Video</label>
                <input
                  type="text"
                  className="form-control"
                  name="pais"
                  // onChange={(e) => asignarCampos(e)}
                  required
                  // value={data.pais}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Intrucciones</label>
                <input
                  type="text"
                  className="form-control"
                  name="pais"
                  // onChange={(e) => asignarCampos(e)}
                  required
                  // value={data.pais}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button className="btn btn-primary">Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Categorias</th>
            <th scope="col">Pais</th>
            <th scope="col">Titulo</th>
            {/* <th scope="col">URL imagen</th>
              <th scope="col">URL video</th> */}
            {/* <th scope="col">Instrucciones</th> */}
            <th scope="col">Acciones</th>
            <th>
              <button
                className="btn btn-success ms-5"
                data-bs-toggle="modal"
                data-bs-target="#mi-modal"
              >
                <i className="fas fa-plus"></i>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {recetas.map((receta, i) => (
            <tr key={receta.id}>
              <td>{i + 1}</td>
              <td>{receta.categoria.nombre}</td>
              <td>{receta.pais}</td>
              <td>{receta.titulo}</td>
              {/* <td>{receta.url_imagen}</td>
                <td>{receta.url_video}</td>  */}
              {/* <td>{receta.instrucciones}</td> */}
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => eliminarReceta(receta.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#mi-modal2"
                  onClick={() => actualizarReceta()}
                >
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </td>
              <td className=""></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
