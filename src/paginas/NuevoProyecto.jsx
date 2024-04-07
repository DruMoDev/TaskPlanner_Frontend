import { Link } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black  text-center">Crear Proyecto</h1>
      <div className="mt-10 flex justify-center flex-col items-center">
        <FormularioProyecto />
        <Link
          to={"/proyectos"}
          className="bg-slate-600 text-center text-white w-10/12 lg:w-1/3 hover:bg-slate-700 w- transition-all shadow-md border px-10 rounded mt-5 font-bold uppercase py-2">
          proyectos
        </Link>
      </div>
    </>
  );
};
export default NuevoProyecto;
