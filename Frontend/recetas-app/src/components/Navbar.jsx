import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { UseUser } from "../hooks/UseUser";
import "./Navbar.css";


export const Navbar = () => {
  const navigation = useNavigate();
  const { isLogin, setIsLogin } = UseUser();

  const salir = () => {
    setIsLogin(false);
    navigation("/login");
    localStorage.setItem("login", false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Recetas
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>
                  <span className="icon-margin">
                    <i className="fa-solid fa-house"></i>
                  </span>
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={"/recetas"}>
                  <span className="icon-margin">
                    <i className="fa-solid fa-utensils"></i>
                  </span>
                  Recetas
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={"/formulario"}>
                  <span className="icon-margin">
                  <i className="fa-brands fa-slack"></i>
                  </span>
                  agregar receta
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={"/crud"}>
                  <span className="icon-margin">
                  <i className="fa-brands fa-slack"></i>
                  </span>
                  categorias
                </NavLink>
              </li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => salir()}>
                  <span className="icon-margin">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </span>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};