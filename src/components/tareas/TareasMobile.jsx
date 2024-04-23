import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useTareas from "../../hooks/useTareas";
import useAuth from "../../hooks/useAuth";
import ModalCrearTarea from "./ModalCrearTarea";
import TareaDesktop from "./TareaDesktop";

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
  const [tareasQueMostrar, setTareasQueMostrar] = useState("pendientes");

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

  // TODO: Cambiar toda la estructura del componente, hacerlo grid, hacer los estados bien, añadir el draganddrop, hacerlo para movil y pc
  return (
    <>
      <ModalCrearTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />

      <div className="flex justify-between my-10  mx-auto w-11/12 ">
        <h1 className="lg:text-4xl text-2xl font-black text-sky-700 my-auto">
          Tareas
        </h1>

        <div className="ml-5 flex gap-5 justify-center items-center">
          <select
            className="border border-gray-300 rounded-md px-3 py-2"
            value={tareasQueMostrar}
            onChange={(e) => setTareasQueMostrar(e.target.value)}>
            <option value="pendientes">Pendientes</option>
            <option value="enProgreso">En Progreso</option>
            <option value="enRevisión">En Revisión</option>
            <option value="terminadas">Terminadas</option>
          </select>
        </div>

        <button
          className="bg-sky-600 px-6 h-12 font-semiboldbold flex text-white items-center justify-center uppercase font-bold hover:bg-sky-700 transition-colors rounded-full "
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

      <div className="w-11/12 mx-auto pb-10">
        {tareasQueMostrar === "pendientes" ? (
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl mb-3 border-b-slate-600 border-b-5 indent-1 pb-1">
              Pendientes
            </h2>
            <ul className="flex flex-col gap-4 mt-2">
              {tareasPendientes.length > 0 ? (
                tareasPendientes.map((tarea) => (
                  <TareaDesktop
                    key={tarea._id}
                    tarea={tarea}
                    handleEliminarTarea={handleEliminarTarea}
                  />
                ))
              ) : (
                <p className="font-semibold text-center italic">
                  No hay tareas pendientes
                </p>
              )}
            </ul>
          </div>
        ) : tareasQueMostrar === "enProgreso" ? (
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl mb-3 border-b-blue-600 border-b-5 indent-1 pb-1">
              En Progreso
            </h2>
            <ul className="flex flex-col gap-4 mt-2">
              {tareasEnProgreso.length > 0 ? (
                tareasEnProgreso.map((tarea) => (
                  <TareaDesktop
                    key={tarea._id}
                    tarea={tarea}
                    handleEliminarTarea={handleEliminarTarea}
                  />
                ))
              ) : (
                <p className="font-semibold text-center italic">
                  No hay tareas en progreso
                </p>
              )}
            </ul>
          </div>
        ) : tareasQueMostrar === "enRevisión" ? (
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl mb-3 border-b-amber-600 border-b-5 indent-1 pb-1">
              En Revisión
            </h2>
            <ul className="flex flex-col gap-4 mt-2">
              {tareasEnRevisión.length > 0 ? (
                tareasEnRevisión.map((tarea) => (
                  <TareaDesktop
                    key={tarea._id}
                    tarea={tarea}
                    handleEliminarTarea={handleEliminarTarea}
                  />
                ))
              ) : (
                <p className="font-semibold text-center italic">
                  No hay tareas en revisión
                </p>
              )}
            </ul>
          </div>
        ) : tareasQueMostrar === "terminadas" ? (
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl mb-3 border-b-green-600 border-b-5 indent-1 pb-1">
              Terminadas
            </h2>
            <ul className="flex flex-col gap-4 mt-2">
              {tareasTerminadas.length > 0 ? (
                tareasTerminadas.map((tarea) => (
                  <TareaDesktop
                    key={tarea._id}
                    tarea={tarea}
                    handleEliminarTarea={handleEliminarTarea}
                  />
                ))
              ) : (
                <p className="font-semibold text-center italic">
                  No hay tareas terminadas
                </p>
              )}
            </ul>
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
      </div>
    </>
  );
};
export default TareasDesktop;
