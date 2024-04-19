import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import formFecha from "../../helpers/formFecha";

const ModalPreviewProyectoEditar = ({
  proyecto,
  isOpen,
  onOpenChange,
  handleEditar,
}) => {
  const { _id } = proyecto;
  const [nombre, setNombre] = useState(proyecto.nombre);
  const [descripcion, setDescripcion] = useState(proyecto.descripcion);
  const [cliente, setCliente] = useState(proyecto.cliente);
  const [fechaEntrega, setFechaEntrega] = useState(proyecto.fechaEntrega);

  const { isDesktop } = useAuth();

  const datos = {
    nombre,
    descripcion,
    cliente,
    fechaEntrega,
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
              Editar Proyecto{" "}
            </ModalHeader>
            <ModalBody className="w-full">
              <form className="bg-white py-10 px-5 w-full rounded-lg shadow">
                <div className="mb-5">
                  <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre">
                    Nombre Proyecto
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
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
                    Descripcion Proyecto
                  </label>
                  <textarea
                    id="descripcion"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion del Proyecto"
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
                    value={formFecha(fechaEntrega)}
                    onChange={(e) => {
                      setFechaEntrega(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-5">
                  <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="cliente">
                    Nombre del Cliente
                  </label>
                  <input
                    type="text"
                    id="cliente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={(e) => {
                      setCliente(e.target.value);
                    }}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await handleEditar(datos, _id);
                  onClose();
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
export default ModalPreviewProyectoEditar;
