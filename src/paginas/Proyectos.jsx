import { useLocation } from "react-router-dom";
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";
import useTareas from "../hooks/useTareas";

const Proyectos = () => {
  const { proyectos, setProyecto, proyecto, setColaborador } = useProyectos();
  const { setTareas } = useTareas();
  const location = useLocation();

  // if (location.pathname === "/proyectos" && proyecto?.nombre !== undefined) {
  //   setProyecto({});
  //   setColaborador({})
  //   setTareas([]);
  // }

  return (
    <>
      <h1 className="text-4xl font-black  ">Proyectos</h1>
      <div className="  mt-10  flex flex-col gap-5 min-h-[500px]">
        {proyectos.length ? (
          proyectos.map((proyecto, index) => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
              index={index}
            />
          ))
        ) : (
          <h4 className="text-center mt-52 text-xl font-bold">
            Visualiza tus nuevos proyectos aquí.
          </h4>
        )}
      </div>
    </>
  );
};
export default Proyectos;
