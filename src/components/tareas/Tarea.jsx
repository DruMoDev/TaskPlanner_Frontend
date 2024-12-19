import formatearFecha from "../../helpers/formatearFecha";
import { useDisclosure } from "@nextui-org/react";
import useTareas from "../../hooks/useTareas";
import { useState } from "react";
import ModalEditarTarea from "./ModalEditarTarea";

const Tarea = ({ tarea, handleEliminarTarea }) => {
  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;
  const { cambiarEstadoTarea } = useTareas();

  const fechaFormateada =
    fechaEntrega === null ? null : formatearFecha(fechaEntrega);
  const [menuVisible, setMenuVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCambiarEstado = async (estado) => {
    await cambiarEstadoTarea(_id, estado);
    setMenuVisible(false);
  };

  return (
    <>
      <ModalEditarTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        tarea={tarea}
      />

      <li
        className={`flex  border-b-2 shadow-sm rounded-lg w-full bg-white min-h-28  relative ${
          estado === "terminada" && "opacity-50"
        }`}>
        <div className="flex flex-col w-full px-4 pt-3 overflow-auto pr-7">
          <div className="flex justify-between ">
            <h2 className="font-semibold text-gray-800 text-md">{nombre} </h2>
            <p className="text-sm text-slate-500">{fechaFormateada}</p>
          </div>

          <h3 className="mt-1 mb-10 mr-3 text-sm text-slate-500">
            {descripcion ? (
              descripcion
            ) : (
              <button
                onClick={onOpen}
                className="italic font-semibold text-blue-600 underline transition-all opacity-40 hover:opacity-100">
                Añadir una descripción
              </button>
            )}
          </h3>
          {prioridad !== "-- Sin Prioridad --" && (
            <p
              className={`text-sm font-semibold  absolute bottom-3 ${
                prioridad === "Baja"
                  ? "text-green-500"
                  : prioridad === "Media"
                  ? "text-amber-500"
                  : "text-red-500"
              }`}>
              {prioridad}
            </p>
          )}
        </div>

        <div className="relative flex pr-4 place-self-center">
          {menuVisible && (
            <div
              className="absolute right-10 -top-11 flex items-center flex-col rounded  border border-black shadow w-[200px] bg-slate-100"
              onMouseLeave={() => setMenuVisible(!menuVisible)}>
              <button
                onClick={onOpen}
                className={
                  " px-4 flex gap-2 hover:bg-sky-600 text-sky-600 hover:text-white font-semiboldbold w-full py-2 items-center justify-center font-bold  transition-all "
                }>
                <p>Editar</p>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1.4em"
                  width="1.4em">
                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                </svg>
              </button>

              <button
                className="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white font-semiboldbold"
                onClick={() => handleEliminarTarea(_id)}>
                <p>Eliminar</p>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1.4em"
                  width="1.4em">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 01-1 1H5a1 1 0 01-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />
                </svg>
              </button>
              <select
                value={estado}
                onChange={(e) => handleCambiarEstado(e.target.value)}
                className="w-full py-2 font-bold text-center transition-all bg-slate-100 text-slate-800 focus:outline-none focus:border-transparent">
                <option value="pendiente">Pendiente</option>
                <option value="enProgreso">En Progreso</option>
                <option value="enRevisión">En Revisión</option>
                <option value="terminada">Terminada</option>
              </select>
            </div>
          )}

          <button onClick={() => setMenuVisible(!menuVisible)} className="absolute px-0 py-0 text-black -translate-y-1/2 right-2 top-1/2">
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
              className="size-5 lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </li>
    </>
  );
};
export default Tarea;
