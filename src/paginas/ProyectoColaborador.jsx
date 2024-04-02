import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import useProyectos from "../hooks/useProyectos";
import Tareas from "../components/Tareas";
import formatearFecha from "../helpers/formatearFecha";
import { Progress } from "@nextui-org/react";
import progressBar from "../helpers/progressBar";
import useTareas from "../hooks/useTareas";
import useAuth from "../hooks/useAuth";

const ProyectoColaborador = () => {
  const { proyecto, handleEditarProyecto, setProyecto } = useProyectos();
  const { tareas } = useTareas();
  const { auth } = useAuth();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const formFecha = (fecha) => {
    const partesFecha = formatearFecha(fecha).split("/");
    const fechaReordenada = [partesFecha[2], partesFecha[1], partesFecha[0]];
    const fechaEntregaFinal = fechaReordenada.join("-");
    return fechaEntregaFinal;
  };

  const handleEditar = () => {
    const datos = {
      nombre,
      descripcion,
      cliente,
      fechaEntrega,
    };

    handleEditarProyecto(_id, datos);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        backdrop="blur"
      >
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
                      htmlFor="nombre"
                    >
                      Nombre Proyecto
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      placeholder="Nombre del Proyecto"
                      value={nombre}
                      onChange={(e) => {
                        const state = { ...proyecto };
                        setProyecto({ ...state, nombre: e.target.value });
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="descripcion"
                    >
                      Descripcion Proyecto
                    </label>
                    <textarea
                      id="descripcion"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      placeholder="Descripcion del Proyecto"
                      value={descripcion}
                      onChange={(e) => {
                        const state = { ...proyecto };
                        setProyecto({
                          ...state,
                          descripcion: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="fecha-entrega"
                    >
                      Fecha de Entrega{" "}
                    </label>
                    <input
                      type="date"
                      id="fecha-entrega"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      value={formFecha(fechaEntrega)}
                      onChange={(e) => {
                        const state = { ...proyecto };

                        setProyecto({
                          ...state,
                          fechaEntrega: formFecha(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      className="text-gray-700 uppercase font-bold text-sm"
                      htmlFor="cliente"
                    >
                      Nombre del Cliente
                    </label>
                    <input
                      type="text"
                      id="cliente"
                      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      placeholder="Nombre del cliente"
                      value={cliente}
                      onChange={(e) => {
                        const state = { ...proyecto };
                        setProyecto({ ...state, cliente: e.target.value });
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
                  onPress={() => {
                    handleEditar(), onClose();
                  }}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {nombre === undefined ? (
        ""
      ) : (
        <div className="bg-amber-300">
          <div className="flex justify-between mb-10 items-center ">
            <h1 className="text-4xl font-black ">{nombre}</h1>
            <div className="w-[500px]  font-bold">
              <Progress
                size="md"
                value={progressBar(tareas)}
                label={`Tareas restantes ${tareasCompletadas}/${tareas.length}`}
              />
            </div>
            <div className="w-1/4"></div>
          </div>
          <div className="w-full flex flex-col bg-white rounded p-5">
            <div className="flex justify-between w-full mb-2">
              <span className="bg-purple-300 px-3 rounded-full border-black border font-semibold py-1">
                {auth._id === proyecto.creador ? "Manager" : "Colaborador"}
              </span>
              <div className="w-full flex justify-end gap-5">
                <p className="text-default-500 text-sm italic">
                  Creado:{" "}
                  <span className=" ">
                    {createdAt && createdAt.slice(0, 10)}
                  </span>
                </p>
                <p className="text-default-500 text-sm italic">
                  Última edición:{" "}
                  <span>{updatedAt && updatedAt.slice(0, 10)}</span>
                </p>
              </div>
            </div>
            <div className="mb-5">
              <p className="font-bold text-xl uppercase">
                Cliente:{" "}
                <span className="normal-case font-normal">{cliente}</span>
              </p>
            </div>
            <div className="mb-5">
              <p className="font-bold text-xl uppercase">
                Descripción:{" "}
                <span className="normal-case font-normal">{descripcion}</span>
              </p>
            </div>
            <div className="mb-5">
              <p className="font-bold text-xl uppercase">
                Fecha de entrega:{" "}
                <span className="normal-case font-normal">
                  {fechaEntrega && formatearFecha(fechaEntrega)}
                </span>
              </p>
            </div>
          </div>

          <Tareas />
        </div>
      )}
    </>
  );
};
export default ProyectoColaborador;
