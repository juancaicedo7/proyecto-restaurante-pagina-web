import axios from "axios";
import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  pais: "",
  titulo: "",
  url_imagen: "",
  url_video: "",
  instrucciones: "",
  categoria: {
    id: "",
  },
};

export const Formulario = ({
  recetaForm,
  isEdit,
}) => {
  const [categoria, setCategoria] = useState([]);
  const [data, setData] = useState(initialState)
  const navigation = useNavigate();



  useEffect(() => {
    obtenerCategorias();
  })


  const obtenerCategorias = async () => {
    try {
    //   setIsLoading(true);
      const { data } = await axios.get("http://localhost:8080/categorias");
      setCategoria(data.data);
      // setData({...data, categoria:{id:data.data[0].id}})
    //   setIsLoading(false);
    } catch (error) {
    //   setIsLoading(false);
      console.log(`error en la funcion obtener categorias ${error.message}`);
    }
  };

  const ejecutarFormulario = (e) => {
    e.preventDefault();
    try {
      
      if(!data.categoria.id){
        return alert("Por favor seleccione una categoria")
      }
      guardarReceta();
    } catch (error) {
      console.log(`error en la funcion ejecutarFormulario categorias ${error.message}`);
    }
  }
  
  const asignarCampos = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const guardarReceta= async() => {

    try {
      await axios.post("http://localhost:8080/recetas",data);
      // alert("receta guardada");
      Swal.fire({
        icon: 'success',
        title: 'Receta guardada con exito',
        showConfirmButton: false,
        timer: 2000
      })
      navigation("/recetas")
      
    } catch (error) {
      console.log(`error en la funcion guardar recetas ${error.message}`);
    }
  }

  return (
    
    <div className="col-4 container card mt-3">
      <h2 className="card-title text-center">RECETAS</h2>
      <div className="card-body">
        <form onSubmit={ejecutarFormulario}>
        
          <div className="mb-3">
            <label className="form-label">Pais</label>
            <input
              type="text"
              className="form-control"
              name="pais"
              onChange={(e) => asignarCampos(e)}
              required
              value={data.pais}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Titulos</label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              onChange={(e) => asignarCampos(e)}
              required
              value={data.titulo}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">URL imagen</label>
            <input
              type="text"
              className="form-control"
              name="url_imagen"
              onChange={(e) => asignarCampos(e)}
              required
              value={data.url_imagen}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">URL video</label>
            <input
              type="text"
              className="form-control"
              name="url_video"
              onChange={(e) => asignarCampos(e)}
              required
              value={data.url_video}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Instrucciones</label>
            <input
              type="text"
              className="form-control"
              name="instrucciones"
              onChange={(e) => asignarCampos(e)}
              required
              value={data.instrucciones}
            />
          </div>

          <select className="form-select mb-3" value={data.categoria.id} onChange={(e) => setData({...data, categoria:{id:e.target.value}})}>
          <option value={null}>
                        Seleccione una categoria
                      </option>
                  {
                    categoria.map((categoria) => (
                      <option value={categoria.id} key={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))
                  }
          </select>

          <button
            className={`btn form-control ${
              isEdit ? "btn-warning" : "btn-success"
            }`}
            type="submit"
          >
            {isEdit ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
};
