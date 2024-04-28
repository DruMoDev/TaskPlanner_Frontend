import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layouts/RutaProtegida";
import Proyectos from "./paginas/Proyectos";
import NuevoProyecto from "./paginas/NuevoProyecto";
import { ProyectosProvider } from "./context/ProyectosProvider";
import { NextUIProvider } from "@nextui-org/react";
import Proyecto from "./paginas/Proyecto";
import { TareasProvider } from "./context/TareasProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgregarColaborador from "./paginas/AgregarColaborador";
import EditarPerfil from "./paginas/EditarPerfil";

function App() {
  return (
    <>
      <BrowserRouter>
        <NextUIProvider>
          <AuthProvider>
            <ProyectosProvider>
              <TareasProvider>
                <ToastContainer
                  closeOnClick
                  pauseOnHover={false}
                  pauseOnFocusLoss={false}
                />
                <Routes>
                  <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="registrar" element={<Registrar />} />
                    <Route
                      path="olvide-password"
                      element={<OlvidePassword />}
                    />
                    <Route
                      path="olvide-password/:token"
                      element={<NuevoPassword />}
                    />
                    <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                  </Route>

                  <Route path="/proyectos" element={<RutaProtegida />}>
                    <Route index element={<Proyectos />}></Route>
                    <Route path="crear-proyectos" element={<NuevoProyecto />} />
                    <Route path=":_id" element={<Proyecto />} />
                    {/* <Route path=":_id/colaborador" element={<Proyecto />} /> */}
                    <Route
                      path=":_id/agregar-colaborador"
                      element={<AgregarColaborador />}
                    />
                    <Route path="editar-perfil" element={<EditarPerfil />} />
                  </Route>
                </Routes>
              </TareasProvider>
            </ProyectosProvider>
          </AuthProvider>
        </NextUIProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
