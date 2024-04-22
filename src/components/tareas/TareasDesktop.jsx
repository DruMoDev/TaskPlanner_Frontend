import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Tarea from "./Tarea";
import useTareas from "../../hooks/useTareas";
import useAuth from "../../hooks/useAuth";
import ModalCrearTarea from "./ModalCrearTarea";

const TareasDesktop = () => {
  const { eliminarTarea, tareas } = useTareas();
  const { isDesktop } = useAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // const [opcionOrden, setOpcionOrden] = useState("estado"); // Por defecto, ordenar por fecha
  // const [tareasOrdenadas, setTareasOrdenadas] = useState([]); // Array de tareas ordenadas

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

  // useEffect(() => {
  //   let tareasOrdenadas;
  //   if (opcionOrden === "fecha") {
  //     tareasOrdenadas = [...tareas].sort((a, b) => {
  //       const fechaEntregaA = new Date(a.fechaEntrega);
  //       const fechaEntregaB = new Date(b.fechaEntrega);
  //       return fechaEntregaA - fechaEntregaB;
  //     });
  //   } else if (opcionOrden === "estado") {
  //     tareasOrdenadas = [...tareas].sort((a, b) =>
  //       a.estado === b.estado ? 0 : a.estado ? 1 : -1
  //     );
  //   } else if (opcionOrden === "prioridad") {
  //     tareasOrdenadas = [...tareas].sort((a, b) => {
  //       const prioridadA = a.prioridad;
  //       const prioridadB = b.prioridad;
  //       // Asigna un valor numérico a cada prioridad para poder compararlas
  //       const prioridadValues = { Baja: 1, Media: 2, Alta: 3 };
  //       return prioridadValues[prioridadA] - prioridadValues[prioridadB];
  //     });
  //   }
  //   setTareasOrdenadas(tareasOrdenadas);
  // }, [tareas, opcionOrden]);

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

  // TODO: Cambiar toda la estructura del componente, hacerlo grid, hacer los estados bien, añadir el draganddrop, hacerlo para movil y pc
  return (
    <>
      <ModalCrearTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />

      <div className="flex justify-between my-10 w-11/12 mx-auto lg:w-full">
        <h1 className="lg:text-4xl text-2xl font-black text-sky-700 my-auto">
          Tareas
        </h1>

        {/* <div className="lg:ml-5 flex gap-5 justify-center items-center">
          {isDesktop && <h2 className="font-semibold text-xl">Ordenar por:</h2>}
          <select
            className="border-2 border-gray-300 rounded-md py-1 pr-3 pl-1  text-gray-700 focus:outline-none focus:border-sky-500"
            value={opcionOrden}
            onChange={(e) => setOpcionOrden(e.target.value)}>
            <option value="fecha">Fecha de Entrega</option>
            <option value="estado">Estado</option>
            <option value="prioridad">Prioridad</option>
          </select>
        </div> */}

        <button
          className="bg-sky-600 px-2 lg:px-6 h-12 font-semiboldbold flex text-white items-center justify-center uppercase font-bold hover:bg-sky-700 transition-colors rounded-full  lg:mr-10 "
          onClick={onOpen}>
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height={`${isDesktop ? "2rem" : "1.6rem"}`}
            width="2em">
            <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z" />
          </svg>
        </button>
      </div>

      {tareas.length !== 0 ? (
        <div className="grid grid-cols-4 lg:grid-cols-4 gap-5 w-11/12 mx-auto">
          {/* {tareasOrdenadas.map((tarea) => (
            <Tarea
              key={tarea._id}
              tarea={tarea}
              handleEliminarTarea={handleEliminarTarea}
            />
          ))} */}

          <div>
            <h2 className="font-semibold text-xl mb-3">Pendientes</h2>
            {tareasPendientes.map((tarea) => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
                handleEliminarTarea={handleEliminarTarea}
              />
            ))}
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-3">En Progreso</h2>
            {tareasEnProgreso.map((tarea) => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
                handleEliminarTarea={handleEliminarTarea}
              />
            ))}
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-3">En Revisión</h2>
            {tareasEnRevisión.map((tarea) => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
                handleEliminarTarea={handleEliminarTarea}
              />
            ))}
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-3">Terminadas</h2>
            {tareasTerminadas.map((tarea) => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
                handleEliminarTarea={handleEliminarTarea}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-32 flex-col w-full">
          <p className="font-semibold text-xl mb-3 text-center my-auto">
            <button className="text-sky-600" onClick={onOpen}>
              Crea
            </button>{" "}
            tareas para tu proyecto
          </p>
        </div>
      )}
    </>
  );
};
export default TareasDesktop;
