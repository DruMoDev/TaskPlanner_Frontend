import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useTareas from "../../hooks/useTareas";
import useAuth from "../../hooks/useAuth";
import ModalCrearTarea from "./ModalCrearTarea";
import Tarea from "./Tarea";

const TareasList = () => {
  const { eliminarTarea, tareas } = useTareas();
  const { isDesktop } = useAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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

  return (
    <>
      <ModalCrearTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />

      {isDesktop ? (
        <>
          <div className="flex justify-between pb-5 mt-10 mb-5 border-b border-slate-300 mx-a">
            <h1 className="my-auto text-2xl font-black lg:text-4xl text-sky-700">
              Tareas
            </h1>

            <button className="bg-sky-600 hover:bg-sky-700" onClick={onOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 lucide lucide-file-plus-2">
                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M3 15h6" />
                <path d="M6 12v6" />
              </svg>
            </button>
          </div>
          {tareas.length !== 0 ? (
            <div className="grid w-11/12 grid-cols-4 gap-5 pb-10 mx-auto">
              <div className="flex flex-col">
                <h2 className="flex gap-1 pb-1 mb-3 text-xl font-semibold text-center border-b-slate-600 border-b-5 indent-1">
                  Pendientes
                  <span>{tareasPendientes.length}</span>
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasPendientes.map((tarea) => (
                    <Tarea
                      key={tarea._id}
                      tarea={tarea}
                      handleEliminarTarea={handleEliminarTarea}
                    />
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h2 className="flex gap-1 pb-1 mb-3 text-xl font-semibold border-b-blue-600 border-b-5 indent-1">
                  En Progreso
                  <span>{tareasEnProgreso.length}</span>
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasEnProgreso.map((tarea) => (
                    <Tarea
                      key={tarea._id}
                      tarea={tarea}
                      handleEliminarTarea={handleEliminarTarea}
                    />
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h2 className="flex gap-1 pb-1 mb-3 text-xl font-semibold border-b-amber-600 border-b-5 indent-1">
                  En Revisión
                  <span>{tareasEnRevisión.length}</span>
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasEnRevisión.map((tarea) => (
                    <Tarea
                      key={tarea._id}
                      tarea={tarea}
                      handleEliminarTarea={handleEliminarTarea}
                    />
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h2 className="flex gap-1 pb-1 mb-3 text-xl font-semibold border-b-green-600 border-b-5 indent-1">
                  Terminadas
                  <span>{tareasTerminadas.length}</span>
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasTerminadas.map((tarea) => (
                    <Tarea
                      key={tarea._id}
                      tarea={tarea}
                      handleEliminarTarea={handleEliminarTarea}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full min-h-32">
              <p className="my-auto mb-3 text-xl font-semibold text-center">
                <button className="text-sky-600" onClick={onOpen}>
                  Crea
                </button>{" "}
                tareas para tu proyecto
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between w-11/12 mx-auto my-10 ">
            <h1 className="my-auto text-2xl font-black lg:text-4xl text-sky-700">
              Tareas
            </h1>

            <div className="flex items-center justify-center gap-5 ml-5">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={tareasQueMostrar}
                onChange={(e) => setTareasQueMostrar(e.target.value)}>
                <option value="pendientes">Pendientes</option>
                <option value="enProgreso">En Progreso</option>
                <option value="enRevisión">En Revisión</option>
                <option value="terminadas">Terminadas</option>
              </select>
            </div>

            <button
              className="flex items-center justify-center h-12 px-6 font-bold text-white uppercase transition-colors rounded-full bg-sky-600 font-semiboldbold hover:bg-sky-700 "
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

          <div className="w-11/12 pb-10 mx-auto">
            {tareasQueMostrar === "pendientes" ? (
              <div className="flex flex-col">
                <h2 className="pb-1 mb-3 text-xl font-semibold border-b-slate-600 border-b-5 indent-1">
                  Pendientes
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasPendientes.length > 0 ? (
                    tareasPendientes.map((tarea) => (
                      <Tarea
                        key={tarea._id}
                        tarea={tarea}
                        handleEliminarTarea={handleEliminarTarea}
                      />
                    ))
                  ) : (
                    <p className="italic font-semibold text-center">
                      No hay tareas pendientes
                    </p>
                  )}
                </ul>
              </div>
            ) : tareasQueMostrar === "enProgreso" ? (
              <div className="flex flex-col">
                <h2 className="pb-1 mb-3 text-xl font-semibold border-b-blue-600 border-b-5 indent-1">
                  En Progreso
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasEnProgreso.length > 0 ? (
                    tareasEnProgreso.map((tarea) => (
                      <Tarea
                        key={tarea._id}
                        tarea={tarea}
                        handleEliminarTarea={handleEliminarTarea}
                      />
                    ))
                  ) : (
                    <p className="italic font-semibold text-center">
                      No hay tareas en progreso
                    </p>
                  )}
                </ul>
              </div>
            ) : tareasQueMostrar === "enRevisión" ? (
              <div className="flex flex-col">
                <h2 className="pb-1 mb-3 text-xl font-semibold border-b-amber-600 border-b-5 indent-1">
                  En Revisión
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasEnRevisión.length > 0 ? (
                    tareasEnRevisión.map((tarea) => (
                      <Tarea
                        key={tarea._id}
                        tarea={tarea}
                        handleEliminarTarea={handleEliminarTarea}
                      />
                    ))
                  ) : (
                    <p className="italic font-semibold text-center">
                      No hay tareas en revisión
                    </p>
                  )}
                </ul>
              </div>
            ) : tareasQueMostrar === "terminadas" ? (
              <div className="flex flex-col">
                <h2 className="pb-1 mb-3 text-xl font-semibold border-b-green-600 border-b-5 indent-1">
                  Terminadas
                </h2>
                <ul className="flex flex-col gap-4 mt-2">
                  {tareasTerminadas.length > 0 ? (
                    tareasTerminadas.map((tarea) => (
                      <Tarea
                        key={tarea._id}
                        tarea={tarea}
                        handleEliminarTarea={handleEliminarTarea}
                      />
                    ))
                  ) : (
                    <p className="italic font-semibold text-center">
                      No hay tareas terminadas
                    </p>
                  )}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col w-full min-h-32">
                <p className="my-auto mb-3 text-xl font-semibold text-center">
                  <button className="text-sky-600" onClick={onOpen}>
                    Crea
                  </button>{" "}
                  tareas para tu proyecto
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default TareasList;
