import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [iniciales, setIniciales] = useState("");
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);

        const palabras = data.nombre.split(" ");
        // Obtener la primera palabra
        const primeraPalabra = palabras[0];
        // Obtener la segunda palabra si existe
        const segundaPalabra = palabras.length > 1 ? palabras[1] : "";
        // Obtener las iniciales de ambas palabras
        setIniciales(
          primeraPalabra.charAt(0) +
            (segundaPalabra ? segundaPalabra.charAt(0) : "")
        );
        navigate("/proyectos");
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando,
        iniciales
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
