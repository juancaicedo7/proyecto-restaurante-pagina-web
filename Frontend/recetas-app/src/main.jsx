import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RutaRecetas } from "./pages/RutaRecetas.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Login } from "./pages/Login.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { PrivateRoute } from "./navigation/PrivateRoute.jsx";
import { Recetas } from "./pages/Recetas";
import { SingleReceta } from "./pages/SingleReceta";
import { Error404 } from "./pages/Error404";
import { Crud } from "./components/Crud.jsx";
import { Formulario } from "./components/Formulario.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <App />,
          </PrivateRoute>
        ),
      },

      {
        path: "/rutarecetas",
        element: (
          <PrivateRoute>
            <RutaRecetas />,
          </PrivateRoute>
        ),
      },
      {
        path: "/recetas",
        element: (
          <PrivateRoute>
            <Recetas />
          </PrivateRoute>
        ),
      },
      {
        path: "/formulario",
        element: (
          <PrivateRoute>
            <Formulario/>
          </PrivateRoute>
        ),
      },
      {
        path: "/crud",
        element: (
          <PrivateRoute>
            <Crud/>
          </PrivateRoute>
        ),
      },
      {
        path: "/recetas/:id",
        element: (
          <PrivateRoute>
            <SingleReceta />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: (
          <PrivateRoute>
            <Error404 />
          </PrivateRoute>
        )
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
