import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../hooks/UseUser";
import Swal from "sweetalert2";

export const Login = () => {
  const navigation = useNavigate();
  const { setIsLogin } = UseUser();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const userLogin = (e) => {
    e.preventDefault();
    if (userInfo.email === "upb@gmail.com" && userInfo.password === "1010") {
      setIsLogin(true);
      localStorage.setItem("login", true);
      navigation("/");
      return;
    }

    Swal.fire({
      icon: "error",
      text: "Email o contraseña incorrecta",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="text-center text-white mt-3">Iniciar Sesión</h1>
      <div className="d-flex justify-content-center">
        <div className="col-8">
          <form onSubmit={userLogin}>
            {/* OBTENER EL CORREO */}
            <div className="mb-3">
              <label className="form-label text-white"></label>
              <input
                className="form-control"
                type="email"
                name="email"
                autoFocus
                required
                onChange={(e) => handleChange(e)}
                placeholder="Ingresar correo electronico"
              />
            </div>

            {/* OBTENER LA CONTRASEÑA */}
            <div className="mb-3">
              <label className="form-label text-white"></label>
              <input
                className="form-control"
                type="password"
                name="password"
                required
                onChange={(e) => handleChange(e)}
                placeholder="Ingresar contraseña"
              />
            </div>
            <button className="btn btn-dark form-control" type="submit">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
