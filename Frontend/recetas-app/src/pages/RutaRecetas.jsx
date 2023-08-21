import { useNavigate } from "react-router-dom";

export const RutaRecetas = () => {

    const navigation = useNavigate()

  return (
    <div>
      <h1>Recetas</h1>
      <button className="btn btn-dark" onClick={()=> navigation("/")}> Volver a App principal</button>
    </div>
  );
};