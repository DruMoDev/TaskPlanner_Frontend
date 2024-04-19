import useProyectos from "../hooks/useProyectos";
import Tareas from "../components/tareas/Tareas";
import ProyectoInfo from "../components/proyectos/ProyectoInfo";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTareas from "../hooks/useTareas";

const Proyecto = () => {
  const { proyecto, obtenerProyecto, setProyecto } = useProyectos();
  const { obtenerTarea, setTareas } = useTareas();
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
          <Tareas />
        </>
      )}
    </>
  );
};
export default Proyecto;
