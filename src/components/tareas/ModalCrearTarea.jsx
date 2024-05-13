import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import useProyectos from "../../hooks/useProyectos";
import { useEffect, useState } from "react";
import { formatearFechaBrowser } from "../../helpers/formatearFecha";
import useTareas from "../../hooks/useTareas";
import { toast } from "react-toastify";

const ModalCrearTarea = ({ isOpen, onOpenChange, onClose }) => {
  const { isDesktop } = useAuth();
  const { crearTarea } = useTareas();

  const { proyecto } = useProyectos();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("-- Sin Prioridad --");
  const [actualizarTareas, setActualizarTareas] = useState(false);
  const [fechaEntrega, setFechaEntrega] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setNombre("");
      setDescripcion("");
      setPrioridad("-- Sin Prioridad --");
      setFechaEntrega(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setNombre("");
    setDescripcion("");
    setPrioridad("-- Sin Prioridad --");
    setFechaEntrega(null);
    onClose();
  }, [actualizarTareas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if ([nombre, descripcion].includes("")) {
        toast.error("Faltan campos por completar");
        return;
      }
      const datos = {
        nombre,
        descripcion,
        prioridad,
        proyecto: proyecto._id,
        fechaEntrega,
      };

      crearTarea(datos);
      setActualizarTareas((actualizarTareas) => !actualizarTareas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={`${isDesktop ? "5xl" : "xs"}`}
      backdrop="blur"
      placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Tarea{" "}
            </ModalHeader>
            <ModalBody className="w-full">
              <form
                name="formCrearTarea"
                className="bg-white py-10 px-5 w-full rounded-lg shadow"
                onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre">
                    Nombre Tarea
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre de la Tarea"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-5">
                  <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion">
                    Descripcion de la tarea
                  </label>
                  <textarea
                    id="descripcion"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion de la tarea..."
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
                    Fecha de Entrega{" "}
                  </label>
                  <input
                    type="date"
                    id="fecha-entrega"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFechaEntrega(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-5">
                  <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="prioridad">
                    Prioridad
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
              <Button color="primary" type="submit" onClick={handleSubmit}>
                Crear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default ModalCrearTarea;
