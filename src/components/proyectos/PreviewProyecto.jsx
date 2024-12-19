import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import ModalPreviewProyectoEditar from "./ModalPreviewProyectoEditar";
import useProyectos from "../../hooks/useProyectos";

const PreviewProyecto = ({ proyecto, index, handleEliminar, handleEditar }) => {
  const { _id, nombre, cliente, creador } = proyecto;

  const { auth } = useAuth();
  const { setProyecto } = useProyectos();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isCreador = auth._id === creador;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    setProyecto({});
  }, [isOpen]);

  return (
    <>
      <ModalPreviewProyectoEditar
        proyecto={proyecto}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleEditar={handleEditar}
      />

      <div className="flex h-32 py-3 pl-5 mx-4 bg-white lg:px-5 lg:mx-0 ">
        <div className="flex items-center flex-grow">
          <p className="self-start mr-2 font-bold lg:mr-14 lg:text-2xl text-sky-600">
            {index + 1}
          </p>
          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center gap-2 lg:gap-5 ">
              <Link
                className={`lg:text-3xl text-2xl font-bold cursor-pointer hover:text-sky-600 transition-all ease-in py-1 ${
                  nombre.length > 13
                    ? "truncate max-w-[150px] lg:max-w-[1000px]"
                    : ""
                }`}
                to={isCreador ? `/proyectos/${_id}` : `/proyectos/${_id}`}>
                {nombre}
              </Link>
              <p
                className={`rounded-3xl px-3 py-1 font-semibold ${
                  isCreador
                    ? "bg-blue-200/60 text-blue-600"
                    : "bg-fuchsia-200/60 text-fuchsia-600"
                }`}>
                {isCreador ? "Creador" : "Colaborador"}
              </p>
            </div>
            <p className="text-sm font-semibold lg:text-lg text-default-500">
              {cliente}
            </p>
          </div>
        </div>

        {isCreador && (
          <div className="flex justify-end w-20 gap-1 lg:w-52">
            {menuVisible && (
              <div
                className="relative flex flex-col items-center gap-1 p-2 my-auto bg-gray-100 border border-gray-800 shadow-lg lg:w-full -top-2 lg:-top-3 lg:gap-2 rounded-xl"
                onMouseLeave={toggleMenu}>
                <Link
                  className={
                    "flex items-center w-full gap-2 py-1 bg-sky-600 hover:bg-sky-700 text-white px-6 rounded-3xl"
                  }
                  to={
                    isCreador
                      ? `/proyectos/${_id}`
                      : `/proyectos/${_id}/colaborador`
                  }>
                  <span className="hidden lg:block">Ver más</span>
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
                    className="lucide lucide-eye size-5">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </Link>

                <button
                  onClick={onOpen}
                  className="flex items-center w-full gap-2 py-1 bg-amber-600 hover:bg-amber-700">
                  <span className="hidden lg:block">Editar</span>
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
                    className="size-4 lucide lucide-pencil">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button
                  className="flex items-center w-full gap-2 py-1 bg-red-600 hover:bg-red-700"
                  onClick={() => handleEliminar(_id)}>
                  <span className="hidden lg:block">Eliminar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash size-5">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            )}
            <button onClick={toggleMenu} className="h-full text-black">
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
                className="size-6 lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default PreviewProyecto;
