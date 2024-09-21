import { Link } from "react-router-dom";
import PreviewProyecto from "../components/proyectos/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";

const Proyectos = () => {
  const { proyectos, handleEliminarProyecto, handleEditarProyecto } =
    useProyectos();
  const { auth } = useAuth();
  console.log(auth);
  

  const handleEliminar = (_id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este proyecto?"
    );
    if (confirmacion) {
      handleEliminarProyecto(_id);
    }
  };

  const handleEditar = (datos, _id) => {
    handleEditarProyecto(_id, datos);
  };

  return (
    <>
    //TODO: añadir nombre
      <h1 className="lg:text-4xl text-2xl font-black lg:ml-0 ml-5">{auth}</h1>
      <h1 className="lg:text-4xl text-2xl font-black lg:ml-0 ml-5">
        Proyectos
      </h1>
      <div className="mt-10 flex flex-col gap-5 min-h-[500px]">
        {proyectos.length ? (
          proyectos.map((proyecto, index) => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
              index={index}
              handleEliminar={handleEliminar}
              handleEditar={handleEditar}
            />
          ))
        ) : (
          <h4 className="text-center mt-52 text-xl font-bold lg:text-3xl">
            <Link
              className="text-sky-700 hover:text-sky-600 hover:underline transition-all"
              to={"crear-proyectos"}>
              Crea{" "}
            </Link>
            tu primer proyecto para empezar a trabajar.
          </h4>
        )}
      </div>
    </>
  );
};
export default Proyectos;
