import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import ModalPreviewProyectoEditar from "./ModalPreviewProyectoEditar";
import useProyectos from "../../hooks/useProyectos";

const PreviewProyecto = ({ proyecto, index, handleEliminar, handleEditar }) => {
  const { _id, nombre, cliente, creador } = proyecto;

  const { auth, isDesktop } = useAuth();
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

      <div className="flex bg-white lg:px-5 pl-5 py-3 mx-4 lg:mx-0 h-32 ">
        <div className="flex-grow flex items-center">
          <p className="font-bold lg:mr-14 mr-2 lg:text-2xl self-start text-sky-600">
            {index + 1}
          </p>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex lg:gap-5 gap-2 items-center ">
              <Link
                className={`lg:text-3xl text-2xl font-bold cursor-pointer hover:text-sky-600 transition-all ease-in py-1 ${
                  nombre.length > 13
                    ? "truncate max-w-[150px] lg:max-w-[1000px]"
                    : ""
                }`}
                to={
                  isCreador
                    ? `/proyectos/${_id}`
                    : `/proyectos/${_id}`

                }>
                {nombre}
              </Link>
              <p
                className={` px-2 lg:px-3 rounded-full border-black border font-semibold py-1  lg:text-base text-[9px] text-center ${
                  isCreador ? "bg-blue-300" : "bg-fuchsia-300"
                }`}>
                {isCreador ? "Creador" : "Colaborador"}
              </p>
            </div>
            <p className="lg:text-lg text-sm font-semibold text-default-500">
              {cliente}
            </p>
          </div>
        </div>

        {isCreador && (
          <div className="flex lg:w-52 w-20 gap-1  justify-end">
            {menuVisible && (
              <div
                className="relative lg:w-full -top-2 lg:-top-3 flex items-center my-auto flex-col lg:gap-2 gap-1 rounded-xl p-2 border-gray-800 border shadow-lg bg-gray-100"
                onMouseLeave={toggleMenu}>
                <Link
                  className={
                    "bg-sky-600 flex gap-2 hover:opacity-[100%] px-6 lg:px-0 hover:bg-sky-700 font-semiboldbold w-full h-8 text-white text-sm lg:text-base items-center justify-center font-bold  transition-all"
                  }
                  to={
                    isCreador
                      ? `/proyectos/${_id}`
                      : `/proyectos/${_id}/colaborador`
                  }>
                  <span className="hidden lg:block">Ver más</span>
                  <svg fill="currentColor" height="1.5em" width="1.5em">
                    <path d="M21 15.344l-2.121 2.121-3.172-3.172-1.414 1.414 3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121 3.172 3.172 1.414-1.414-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121-3.172 3.172 1.414 1.414 3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121 3.172-3.172-1.414-1.414-3.172 3.172L3 15.344z" />
                  </svg>
                </Link>

                <button
                  onClick={onOpen}
                  className="bg-amber-600  flex gap-2 px-6 lg:px-0  hover:opacity-[100%] hover:bg-amber-700 text-sm lg:text-base font-semiboldbold w-full h-8 text-white items-center justify-center font-bold  transition-all">
                  <span className="hidden lg:block">Editar</span>
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em">
                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                  </svg>
                </button>
                <button
                  className="bg-red-600  flex gap-2  hover:opacity-[100%] px-6 lg:px-0 hover:bg-red-800 hover:text-red-300 text-sm lg:text-base font-semiboldbold w-full h-8 text-white items-center justify-center font-bold  transition-all "
                  onClick={() => handleEliminar(_id)}>
                  <span className="hidden lg:block">Eliminar</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 01-1 1H5a1 1 0 01-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />
                  </svg>
                </button>
              </div>
            )}
            <button onClick={toggleMenu} className="h-full">
              <svg
                className="mr-1 lg:mr-0"
                viewBox="0 0 21 21"
                fill="currentColor"
                height={`${isDesktop ? "2.2rem" : "2rem"}`}
                widths={`${isDesktop ? "2.2rem" : "1.5rem"}`}>
                <g fill="currentColor" fillRule="evenodd">
                  <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
                  <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
                  <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
                </g>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default PreviewProyecto;
