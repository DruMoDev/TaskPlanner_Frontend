import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      {auth._id ? (
        <div className="font-sans">
          <Header />
          <div className="md:flex md:min-h-screen">
            {/* <Sidebar /> */}
            <main className="container mx-auto pt-10">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
    </>
  );
};
export default RutaProtegida;
