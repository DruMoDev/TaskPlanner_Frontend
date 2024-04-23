import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Alerta from "../Alerta";
import useAuth from "../../hooks/useAuth";
import useProyectos from "../../hooks/useProyectos";
import { useEffect, useState } from "react";
import formatearFecha from "../../helpers/formatearFecha";
import useTareas from "../../hooks/useTareas";

const ModalCrearTarea = ({ isOpen, onOpenChange, onClose }) => {
  const { isDesktop } = useAuth();
  const { crearTarea } = useTareas();

  const { proyecto, mostrarAlerta, alerta } = useProyectos();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("Baja");
  const [actualizarTareas, setActualizarTareas] = useState(false);
  const [fechaDeEntrega, setFechaDeEntrega] = useState("");

  useEffect(() => {
    if (!isOpen) {
      const partesFecha = formatearFecha(Date.now()).split("/");
      const fechaReordenada = [partesFecha[2], partesFecha[1], partesFecha[0]];
      mostrarAlerta({});
      setNombre("");
      setDescripcion("");
      setPrioridad("Baja");
      setFechaDeEntrega(fechaReordenada.join("-"));
    }
  }, [isOpen]);

  useEffect(() => {
    const partesFecha = formatearFecha(Date.now()).split("/");
    const fechaReordenada = [partesFecha[2], partesFecha[1], partesFecha[0]];
    setNombre("");
    setDescripcion("");
    setPrioridad("Baja");
    setFechaDeEntrega(fechaReordenada.join("-"));
    onClose();
  }, [actualizarTareas]);

  const handleCrear = async () => {
    try {
      if (
        [nombre, descripcion, prioridad].includes("") &&
        fechaDeEntrega.length < 10
      ) {
        mostrarAlerta({ msg: "Faltan campos por completar", error: true });
        return;
      }
      const datos = {
        nombre,
        descripcion,
        prioridad,
        proyecto: proyecto._id,
        fechaEntrega: fechaDeEntrega,
      };

      await crearTarea(datos);
      setActualizarTareas((actualizarTareas) => !actualizarTareas);
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alerta;

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
              {msg && <Alerta alerta={alerta} />}
              <form
                name="formCrearTarea"
                className="bg-white py-10 px-5 w-full rounded-lg shadow"
                onSubmit={(e) => e.preventDefault()}>
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
                    value={fechaDeEntrega}
                    onChange={(e) => {
                      setFechaDeEntrega(e.target.value);
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
                  handleCrear();
                }}>
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
