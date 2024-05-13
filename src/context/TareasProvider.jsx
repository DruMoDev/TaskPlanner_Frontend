import { createContext, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify";

const TareasContext = createContext();

const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const obtenerTarea = async (_id) => {
    try {
      const { data } = await clienteAxios.get(`/proyectos/${_id}`, config);
      setTareas(data.tareas);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTarea = async (datos) => {
    try {
      const { data } = await clienteAxios.post("/tareas", datos, config);
      console.log(data);
      setTareas([...tareas, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      const { data } = await clienteAxios.delete(`/tareas/${id}`, config);
      console.log(data);
      const tareasActualizadas = tareas.filter((objeto) => {
        return objeto._id !== id;
      });
      setTareas([...tareasActualizadas]);
      toast.success("Tarea eliminada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarEstadoTarea = async (id, estado) => {
    try {
      // La const de datos es irrelebante, solo es para poder hacer un "post"
      const datos = { estado };
      const { data } = await clienteAxios.put(
        `/tareas/estado/${id}`,
        datos,
        config
      );

      const tareasActualizadas = tareas.map((tarea) => {
        if (tarea._id === id) {
          return {
            ...tarea,
            estado: data.estado,
          };
        } else {
          return tarea;
        }
      });
      setTareas([...tareasActualizadas]);
      toast.success("Estado de la tarea actualizado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (id, datos) => {
    try {
      const { data } = await clienteAxios.put(`/tareas/${id}`, datos, config);

      const tareasActualizadas = tareas.map((tarea) => {
        if (tarea._id === id) {
          return {
            ...tarea,
            nombre: data.nombre,
            prioridad: data.prioridad,
            descripcion: data.descripcion,
            fechaEntrega: data.fechaEntrega,
          };
        } else {
          return tarea;
        }
      });
      setTareas([...tareasActualizadas]);
      toast.success("Tarea editada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TareasContext.Provider
      value={{
        obtenerTarea,
        tareas,
        crearTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        setTareas,
        editarTarea,
      }}>
      {children}
    </TareasContext.Provider>
  );
};

export { TareasProvider };

export default TareasContext;
