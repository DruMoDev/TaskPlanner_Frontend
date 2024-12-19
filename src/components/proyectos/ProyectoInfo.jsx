import { useDisclosure } from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import useProyectos from "../../hooks/useProyectos";
import { useNavigate } from "react-router-dom";
import formatearFecha from "../../helpers/formatearFecha";
import ModalProyectoInfoEditar from "./ModalProyectoInfoEditar";

const ProyectoInfo = () => {
  const { proyecto, handleEliminarProyecto, setColaborador } = useProyectos();
  const { auth, isDesktop } = useAuth();
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

      <div className="flex items-center justify-between gap-2 px-5 mx-auto mb-10 lg:px-0 lg:gap-6">
        <h1
          className={`lg:text-4xl text-3xl font-black truncate lg:h-12 lg:max-w-[1000px]`}>
          {nombre}
        </h1>

        {isCreador && (
          <div className="flex items-center justify-center gap-2 lg:gap-5">
            <button
              onClick={handleAgregarColaborador}
              className="bg-green-500 hover:bg-green-600">
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
                className="lucide lucide-user-plus size-6">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </button>
            <button onClick={onOpen} className="bg-sky-600 hover:bg-sky-700">
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
                className="size-6 lucide lucide-pencil">
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
            <button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleEliminar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash size-6">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col w-11/12 p-5 mx-auto bg-white rounded shadow lg:px-10">
        <div className="flex justify-between w-full mb-2">
          <span
            className={`rounded-3xl px-3 py-1 font-semibold ${
              isCreador
                ? "bg-blue-200/60 text-blue-600"
                : "bg-fuchsia-200/60 text-fuchsia-600"
            }`}>
            {isCreador ? "Creador" : "Colaborador"}
          </span>
          {isDesktop && (
            <div className="flex justify-end w-full gap-5">
              <p className="text-sm italic text-default-500">
                Creado:{" "}
                <span className="">{createdAt && createdAt.slice(0, 10)}</span>
              </p>
              <p className="text-sm italic text-default-500">
                Última edición:{" "}
                <span>{updatedAt && updatedAt.slice(0, 10)}</span>
              </p>
            </div>
          )}
        </div>
        <div className="mb-5 text-xl font-light lg:text-2xl">
          <p>
            Cliente: <span className="font-bold">{cliente}</span>
          </p>
        </div>
        <div className="mb-5 text-xl font-light lg:text-2xl">
          <p>
            Descripción: <span className="font-bold">{descripcion}</span>
          </p>
        </div>
        <div className="mb-5 text-xl font-light lg:text-2xl">
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
