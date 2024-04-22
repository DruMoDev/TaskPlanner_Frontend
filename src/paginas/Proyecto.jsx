import useProyectos from "../hooks/useProyectos";
import ProyectoInfo from "../components/proyectos/ProyectoInfo";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTareas from "../hooks/useTareas";
import TareasDesktop from "../components/tareas/TareasDesktop";
import useAuth from "../hooks/useAuth";
import TareasMobile from "../components/tareas/TareasMobile";

const Proyecto = () => {
  const { proyecto, obtenerProyecto, setProyecto } = useProyectos();
  const { obtenerTarea, setTareas } = useTareas();
  const {isDesktop} = useAuth();
  const params = useParams();
  const _id = params._id;

  useEffect(() => {
    obtenerProyecto(_id);
    obtenerTarea(_id);

    return () => {
      setProyecto({});
      setTareas([]);
    };
  }, []);

  return (
    <>
      {proyecto && proyecto.nombre !== undefined && (
        <>
          <ProyectoInfo />
          {isDesktop ? <TareasDesktop /> : <TareasMobile />}
        </>
      )}
    </>
  );
};
export default Proyecto;
