import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      {auth._id ? (
        <div className="font-sans">
          <Header />
            <main className="container mx-auto pt-10 md:min-h-screen">
              <Outlet />
            </main>
        </div>
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
    </>
  );
};
export default RutaProtegida;
