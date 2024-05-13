import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useTareas from "../../hooks/useTareas";
import formFecha from "../../helpers/formFecha";

const ModalEditarTarea = ({ onOpenChange, isOpen, tarea }) => {
  const [nombre, setNombre] = useState(tarea.nombre);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [prioridad, setPrioridad] = useState(tarea.prioridad);
  const [fechaEntrega, setFechaEntrega] = useState(tarea.fechaEntrega);
  const { _id } = tarea;
  const { isDesktop } = useAuth();
  const { editarTarea } = useTareas();

  const handleEditarTarea = () => {
    const datos = {
      nombre,
      descripcion,
      prioridad,
      fechaEntrega,
    };
    editarTarea(_id, datos);
  };

  return (
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
                name="formEditarTarea"
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
                    value={fechaEntrega && formFecha(fechaEntrega)}
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
                    <option value="-- Sin Prioridad --">
                      -- Sin Prioridad --
                    </option>
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
  );
};
export default ModalEditarTarea;
