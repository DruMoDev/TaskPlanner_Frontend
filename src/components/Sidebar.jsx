import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import useTareas from "../hooks/useTareas";

const Sidebar = () => {
  const { auth } = useAuth();
  const { setProyecto, setColaborador } = useProyectos();
  const { setTareas } = useTareas();
  return (
    <aside className="w-62 px-5 py-10 ">
      <p className="text-2xl font-bold">
        Bienvenido <span className="uppercase">{auth.nombre}</span>
      </p>
      <Link
        onClick={() => {
          setProyecto({});
          setColaborador({});
          setTareas([]);
        }}
        to={"/proyectos"}
        className="bg-sky-600 hover:bg-sky-700 transition-all ease-in w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Proyectos
      </Link>
      <Link
        onClick={() => {
          setProyecto({});
          setColaborador({});
          setTareas([]);
        }}
        to="crear-proyectos"
        className="bg-sky-600 hover:bg-sky-700 transition-all ease-in w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};
export default Sidebar;
