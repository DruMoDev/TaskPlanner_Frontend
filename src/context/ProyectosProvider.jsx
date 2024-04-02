import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [alerta, setAlerta] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
  };

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        if (!token) {
          return;
        }
        const { data } = await clienteAxios("/proyectos", config);        
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, []);

  
  const submitProyecto = async (proyecto) => {
    try {
      if (!token) {
        return;
      }

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      setAlerta({ msg: "Proyecto creado correctamente.", error: false });
      setProyectos([...proyectos, data]);
      setAlerta({});
      navigate("/proyectos");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminarProyecto = async (_id) => {
    try {
      const { data } = await clienteAxios.delete(`/proyectos/${_id}`, config);
      const proyectosFiltrado = proyectos.filter((proyecto) => {
        return proyecto._id !== _id;
      });
      setProyectos([...proyectosFiltrado]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (_id) => {
    try {
      const { data } = await clienteAxios.get(`/proyectos/${_id}`, config);
      setProyecto(data.proyecto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditarProyecto = async (_id, datos) => {
    try {
      const { data } = await clienteAxios.put(
        `/proyectos/${_id}`,
        datos,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarColaborador = async (id) => {
    const datos = { id: proyecto._id};
    const { data } = await clienteAxios.post(
      `/proyectos/agregar-colaborador/${id}`,
      datos,
      config
    );
    console.log(data);
  };

  const buscarColaborador = async (email) => {
    const { data } = await clienteAxios.get(
      `/proyectos/buscar-colaborador/${email}`,
      config
    );
    setColaborador(data);
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        handleEliminarProyecto,
        obtenerProyecto,
        proyecto,
        handleEditarProyecto,
        setProyecto,
        agregarColaborador,
        buscarColaborador,
        colaborador,
        setColaborador,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
