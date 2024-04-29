import useProyectos from "../hooks/useProyectos";
import ProyectoInfo from "../components/proyectos/ProyectoInfo";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTareas from "../hooks/useTareas";
import TareasDesktop from "../components/tareas/TareasDesktop";
import useAuth from "../hooks/useAuth";
import TareasMobile from "../components/tareas/TareasMobile";

const Proyecto = () => {
  const [isAgregarColaborador, setIsAgregarColaborador] = useState(false);
  const { proyecto, obtenerProyecto, setProyecto } = useProyectos();
  const { obtenerTarea, setTareas } = useTareas();
  const { isDesktop } = useAuth();
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
              {isDesktop ? <TareasDesktop /> : <TareasMobile />}
            </>
          )}
        </>
      )}
    </>
  );
};
export default Proyecto;
