// import { Crud } from "./components/Crud";
// import { Formulario } from "./components/Formulario";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css"
import logoblanco from "./img/logoblanco.png"

function App() {

  const navigation = useNavigate();

  return (
    <>
    <section className="bg-dark text- light p-5 text-center text-sm-start">
    <div className="container">
      <div className="d-sm-flex align-items-center justify-content-between">
        <div className="text-light">
          <h1 className="title">
            <span className="text-light">WE</span>{" "}
            <span className="text-purple">FOOD</span>
          </h1>
          <p className="lead">
          Tú satisfacción es nuestra mayor inspiración. ¡Bienvenido a una experiencia gastronómica inolvidable!
          </p>
          <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#enroll" onClick={()=> navigation("/recetas")}>
              Buscar receta
          </button>
        </div>
        <img src={logoblanco} alt="" className="w-50 h-50"/>
      </div>
    </div>
  </section>
</>
   

  );
}
export default App;
