import { Progress, useDisclosure } from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import useProyectos from "../../hooks/useProyectos";
import progressBar from "../../helpers/progressBar";
import useTareas from "../../hooks/useTareas";
import { useNavigate } from "react-router-dom";
import formatearFecha from "../../helpers/formatearFecha";
import ModalProyectoInfoEditar from "./ModalProyectoInfoEditar";

const ProyectoInfo = () => {
  const { proyecto, handleEliminarProyecto, setColaborador } = useProyectos();
  const { auth, isDesktop } = useAuth();
  const { tareas } = useTareas();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isCreador = auth._id === proyecto.creador;

  const {
    nombre,
    descripcion,
    updatedAt,
    createdAt,
    fechaEntrega,
    _id,
    cliente,
  } = proyecto;

  let tareasCompletadas = 0;
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].estado) {
      // Si el estado es false
      tareasCompletadas += 1;
    }
  }

  const handleEliminar = () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este proyecto?"
    );
    if (confirmacion) {
      handleEliminarProyecto(_id);
    }
  };

  const handleAgregarColaborador = async () => {
    setColaborador({});
    navigate(`/proyectos${"/" + _id}/agregar-colaborador`);

    // await agregarColaborador();
  };

  return (
    <>
      <ModalProyectoInfoEditar isOpen={isOpen} onOpenChange={onOpenChange} />

      <div className="flex mb-10 items-center mx-auto px-5 lg:px-0 justify-between lg:w-11/12">
        <h1 className="lg:text-4xl text-3xl font-black truncate max-w-[200px] lg:max-w-[700px] lg:h-12 ">
          {nombre}
        </h1>
        {isDesktop && (
          <div className="w-[500px]  font-bold mx-auto">
            <Progress
              size="md"
              value={progressBar(tareas)}
              label={`Tareas restantes ${tareasCompletadas}/${tareas.length}`}
            />
          </div>
        )}

        {isCreador && (
          <div className="flex gap-2 lg:gap-5">
            <button
              onClick={handleAgregarColaborador}
              className="rounded-full px-1 lg:px-6 bg-sky-600 font-semiboldbold flex text-white items-center justify-center font-bold hover:bg-sky-700 transition-colors  h-12">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height={`${isDesktop ? "3rem" : "1.8rem"}`}
                width="2.7em">
                <path d="M892 772h-80v-80c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v80h-80c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h80v80c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-80h80c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM373.5 498.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 01-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.8-1.7-203.2 89.2-203.2 200 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 008 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.8-1.1 6.4-4.8 5.9-8.8zM824 472c0-109.4-87.9-198.3-196.9-200C516.3 270.3 424 361.2 424 472c0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 00-86.4 60.4C357 742.6 326 814.8 324 891.8a8 8 0 008 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5C505.8 695.7 563 672 624 672c110.4 0 200-89.5 200-200zm-109.5 90.5C690.3 586.7 658.2 600 624 600s-66.3-13.3-90.5-37.5a127.26 127.26 0 01-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4-.1 34.2-13.4 66.3-37.6 90.5z" />
              </svg>
            </button>
            <button
              onClick={onOpen}
              className="rounded-full px-1 lg:px-6 h-12 bg-sky-600 font-semiboldbold  flex text-white items-center justify-center uppercase font-bold hover:bg-sky-700 transition-colors">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height={`${isDesktop ? "2.4rem" : "1.7rem"}`}
                width="2.4em">
                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
              </svg>
            </button>
            <button
              className="rounded-full px-1 lg:px-6 bg-red-600 font-semiboldbold text-white  flex items-center justify-center uppercase font-bold hover:bg-red-700 transition-colors h-12"
              onClick={handleEliminar}>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height={`${isDesktop ? "2.4rem" : "1.7rem"}`}
                width="2.4em">
                <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="w-11/12 mx-auto flex flex-col bg-white rounded p-5 lg:px-10 shadow">
        <div className="flex justify-between w-full mb-2">
          <span
            className={`px-3 rounded-full border-black border font-semibold py-1 text-xs lg:text-base ${
              isCreador ? "bg-purple-400" : "bg-amber-300"
            }`}>
            {isCreador ? "Creador" : "Colaborador"}
          </span>
          {isDesktop && (
            <div className="w-full flex justify-end gap-5">
              <p className="text-default-500 text-sm italic">
                Creado:{" "}
                <span className=" ">{createdAt && createdAt.slice(0, 10)}</span>
              </p>
              <p className="text-default-500 text-sm italic">
                Última edición:{" "}
                <span>{updatedAt && updatedAt.slice(0, 10)}</span>
              </p>
            </div>
          )}
        </div>
        <div className="mb-5 text-xl lg:text-2xl font-light">
          <p>
            Cliente: <span className="font-bold">{cliente}</span>
          </p>
        </div>
        <div className="mb-5 text-xl lg:text-2xl font-light">
          <p>
            Descripción: <span className="font-bold">{descripcion}</span>
          </p>
        </div>
        <div className="mb-5 text-xl lg:text-2xl font-light">
          <p>
            Fecha de entrega:{" "}
            <span className="font-bold">
              {fechaEntrega && formatearFecha(fechaEntrega)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default ProyectoInfo;
