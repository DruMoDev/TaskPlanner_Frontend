import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Tarea from "./Tarea";
import useTareas from "../../hooks/useTareas";
import useAuth from "../../hooks/useAuth";
import ModalCrearTarea from "./ModalCrearTarea";

const TareasMobile = () => {
  const { eliminarTarea, tareas } = useTareas();
  const { isDesktop } = useAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [tareasEnProgreso, setTareasEnProgreso] = useState([]);
  const [tareasEnRevisión, setTareasEnRevisión] = useState([]);
  const [tareasTerminadas, setTareasTerminadas] = useState([]);

  useEffect(() => {
    const tareasPendientes = tareas.filter(
      (tarea) => tarea.estado === "pendiente"
    );
    const tareasEnProgreso = tareas.filter(
      (tarea) => tarea.estado === "enProgreso"
    );
    const tareasEnRevisión = tareas.filter(
      (tarea) => tarea.estado === "enRevisión"
    );
    const tareasTerminadas = tareas.filter(
      (tarea) => tarea.estado === "terminada"
    );

    setTareasPendientes(tareasPendientes);
    setTareasEnProgreso(tareasEnProgreso);
    setTareasEnRevisión(tareasEnRevisión);
    setTareasTerminadas(tareasTerminadas);
  }, [tareas]);

  const handleEliminarTarea = async (_id) => {
    try {
      const confirmacion = window.confirm(
        "¿Estás seguro de que deseas eliminar esta tarea?"
      );
      if (confirmacion) {
        await eliminarTarea(_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalCrearTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />

      <div className="w-11/12 flex  mx-auto mt-10 items-center justify-center">
        <h1 className="lg:text-4xl text-2xl font-black text-sky-700 my-auto">
          Tareas
        </h1>
      </div>
    </>
  );
};
export default TareasMobile;
