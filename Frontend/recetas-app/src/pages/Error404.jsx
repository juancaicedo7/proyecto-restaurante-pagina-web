import { Link } from "react-router-dom"

export const Error404 = () => {
  return (
    <div className="text-center text-white mt-5">
        <h1>404 Pagina no encontrada</h1>
        <Link to="/" className="btn btn-warning text-white">
            Volver a la pagina principal
        </Link>
    </div>
  )
}

