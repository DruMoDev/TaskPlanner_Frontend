import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import useTareas from "../hooks/useTareas";

const Header = () => {
  const { iniciales, editarPerfil } = useAuth();
  const { setProyecto, setColaborador } = useProyectos();
  const { setTareas } = useTareas();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="py-2.5 bg-white border-b w-full">
      <div className="flex items-center mx-auto w-11/12 relative justify-between">
        <Link
          className="text-xl lg:text-3xl text-sky-600 font-black text-center"
          to={"/proyectos"}>
          UpTask
        </Link>

        <Link
          onClick={() => {
            setProyecto({});
            setColaborador({});
            setTareas([]);
          }}
          to="crear-proyectos"
          className="bg-sky-700 hover:bg-sky-600 transition-all px-3 py-2.5 text-white uppercase font-bold text-center rounded text-sm lg:px-10 lg:py-3 lg:tracking-wide">
          Crear
        </Link>

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full bg-purple-600 h-6 w-6 p-4 text-sm items-center flex justify-center  lg:text-base lg:h-10 lg:w-10 font-bold text-white hover:opacity-80 cursor-pointer transition-all">
          {iniciales}
        </div>
        {menuOpen && (
          <div
            onMouseLeave={() => setMenuOpen(false)}
            className="absolute font-semibold top-11 right-2 lg:right-5 lg:top-14 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col text-sm lg:text-lg">
            <Link
              className="hover:bg-slate-200 transition-all px-3 rounded-t py-2 border-b"
              to="editar-perfil">
              Editar Perfil
            </Link>
            <button
              type="button"
              className="hover:bg-sky-600 hover:text-white transition-all px-3 py-2 rounded-b"
              onClick={handleCerrarSesion}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
