import useProyectos from "../hooks/useProyectos";
import ProyectoInfo from "../components/proyectos/ProyectoInfo";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTareas from "../hooks/useTareas";
import TareasList from "../components/tareas/TareasList";

const Proyecto = () => {
  const [isAgregarColaborador, setIsAgregarColaborador] = useState(false);
  const { proyecto, obtenerProyecto, setProyecto } = useProyectos();
  const { obtenerTarea, setTareas } = useTareas();
  const params = useParams();
  const _id = params._id;
  const { pathname } = useLocation();

  useEffect(() => {
    obtenerProyecto(_id);
    obtenerTarea(_id);
    if (pathname.includes("agregar-colaborador")) {
      setIsAgregarColaborador(true);
    } else {
      setIsAgregarColaborador(false);
    }

    return () => {
      setProyecto({});
      setTareas([]);
    };
  }, [pathname]);

  return (
    <>
      {proyecto && proyecto.nombre !== undefined && (
        <>
          {isAgregarColaborador ? (
            <Outlet />
          ) : (
            <>
              <ProyectoInfo />
              <TareasList />
            </>
          )}
        </>
      )}
    </>
  );
};
export default Proyecto;
