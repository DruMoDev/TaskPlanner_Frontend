import formatearFecha from "../helpers/formatearFecha";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import useAuth from "../hooks/useAuth";
import useTareas from "../hooks/useTareas";
import { useState } from "react";
import formFecha from "../helpers/formFecha";

const Tarea = ({ tarea, handleEliminarTarea }) => {
  const [nombre, setNombre] = useState(tarea.nombre);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState(tarea.prioridad);
  const [fechaEntrega, setFechaEntrega] = useState(tarea.fechaEntrega);
  const [_id, setId] = useState(tarea._id);
  const { completarTarea, editarTarea } = useTareas();
  const { isDesktop } = useAuth();
  const fechaFormateada = formatearFecha(fechaEntrega);
  const [menuVisible, setMenuVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleCompletarTarea = async () => {
    await completarTarea(_id);
    setMenuVisible(false);
  };

  const handleEditarTarea = () => {
    const datos = {
      nombre,
      descripcion,
      prioridad,
      fechaEntrega,
    };
    editarTarea(_id, datos);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={`${isDesktop ? "5xl" : "xs"}`}
        placement="center"
        backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Tarea
              </ModalHeader>
              <ModalBody className="w-full">
                <form
                  className="bg-white py-10 px-5 w-full rounded-lg shadow"
                  onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="nombre">
                      Nombre de la Tarea
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      placeholder="Nombre de la tarea"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="descripcion">
                      Descripción de la Tarea
                    </label>
                    <textarea
                      id="descripcion"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      placeholder="Descripcion de la tarea"
                      value={descripcion}
                      onChange={(e) => {
                        setDescripcion(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="fecha-entrega">
                      Fecha de Entrega
                    </label>
                    <input
                      type="date"
                      id="fecha-entrega"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      value={formFecha(fechaEntrega)}
                      onChange={(e) => {
                        setFechaEntrega(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="prioridad">
                      Prioridad{" "}
                    </label>
                    <select
                      id="prioridad"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      value={prioridad}
                      onChange={(e) => {
                        setPrioridad(e.target.value);
                      }}>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleEditarTarea(), onClose();
                  }}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div
        className={`flex justify-between items-center py-5 pl-5 lg:pr-5  border-b-2 shadow-sm mb-2 mx-auto rounded-lg lg:w-full w-11/12 ${
          tarea.estado
            ? "opacity-50 border border-black italic bg-white"
            : "bg-white"
        }`}>
        {isDesktop ? (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold indent-1 mb-1">{nombre}</h2>
              <span className="b-l border-1 mx-2 border-black h-5"></span>
              <p
                className={`text-lg font-semibold  ${
                  prioridad === "Baja" ? "text-green-700" : ""
                } ${prioridad === "Media" ? "text-amber-500" : ""} ${
                  prioridad === "Alta" ? "text-red-700" : ""
                }`}>
                {prioridad}
              </p>
              <span className="b-l border-1 mx-2 border-black h-5"></span>
              <p className="text-md font-semibold">{fechaFormateada}</p>
            </div>

            <p className="text-sm ">{descripcion}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 w-4/6">
            <h2 className="text-xl font-semibold">{nombre}</h2>
            <p
              className={`text-md font-semibold ${
                prioridad === "Baja" ? "text-green-700" : ""
              } ${prioridad === "Media" ? "text-amber-500" : ""} ${
                prioridad === "Alta" ? "text-red-700" : ""
              }`}>
              {prioridad}
            </p>

            <p className="text-sm">{descripcion}</p>
          </div>
        )}

        <div className="flex lg:w-[200px] gap-1 h-28 justify-between">
          {menuVisible ? (
            <div
              className="relative w-full -top-3 lg:-right-0 -right-3 flex items-center my-auto flex-col gap-2 rounded-xl p-2 border-gray-800 border shadow-lg bg-gray-100"
              onMouseLeave={() => setMenuVisible(!menuVisible)}>
              <button
                onClick={onOpen}
                className={
                  "bg-sky-600 px-4 flex gap-2 hover:opacity-[100%] hover:bg-sky-700 font-semiboldbold w-full h-8 text-white items-center justify-center font-bold  transition-all rounded-xl"
                }>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1.4em"
                  width="1.4em">
                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                </svg>
              </button>
              {tarea.estado ? (
                <button
                  className={`bg-amber-600  flex gap-2  hover:opacity-[100%] hover:bg-amber-700 font-semiboldbold w-full h-8 text-white items-center justify-center font-bold  transition-all rounded-xl`}
                  onClick={handleCompletarTarea}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.4em"
                    width="1.4em">
                    <path d="M12 4c2.1 0 4.1.8 5.6 2.3 3.1 3.1 3.1 8.2 0 11.3-1.8 1.9-4.3 2.6-6.7 2.3l.5-2c1.7.2 3.5-.4 4.8-1.7 2.3-2.3 2.3-6.1 0-8.5C15.1 6.6 13.5 6 12 6v4.6l-5-5 5-5V4M6.3 17.6C3.7 15 3.3 11 5.1 7.9l1.5 1.5c-1.1 2.2-.7 5 1.2 6.8.5.5 1.1.9 1.8 1.2l-.6 2c-1-.4-1.9-1-2.7-1.8z" />
                  </svg>{" "}
                </button>
              ) : (
                <button
                  className={`bg-green-600  flex gap-2  hover:opacity-[100%] hover:bg-green-700 font-semiboldbold w-full h-8 text-white items-center justify-center font-bold  transition-all rounded-xl`}
                  onClick={handleCompletarTarea}>
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.4em"
                    width="1.4em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
                  </svg>{" "}
                </button>
              )}
              <button
                className="bg-red-600  flex gap-2  hover:opacity-[100%] hover:bg-red-800 hover:text-red-300 font-semiboldbold w-full h-8 text-white items-center justify-center font-bold  transition-all rounded-xl"
                onClick={() => handleEliminarTarea(_id)}>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1.4em"
                  width="1.4em">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 01-1 1H5a1 1 0 01-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="h-28"></div>
          )}
          <button onClick={toggleMenu}>
            <svg
              viewBox="0 0 21 21"
              fill="currentColor"
              height="2.2rem"
              width="2.2rem">
              <g fill="currentColor" fillRule="evenodd">
                <path d="M11.5 10.5 A1 1 0 0 1 10.5 11.5 A1 1 0 0 1 9.5 10.5 A1 1 0 0 1 11.5 10.5 z" />
                <path d="M11.5 5.5 A1 1 0 0 1 10.5 6.5 A1 1 0 0 1 9.5 5.5 A1 1 0 0 1 11.5 5.5 z" />
                <path d="M11.5 15.5 A1 1 0 0 1 10.5 16.5 A1 1 0 0 1 9.5 15.5 A1 1 0 0 1 11.5 15.5 z" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default Tarea;
