import { useState } from "react";
import useAuth from "../hooks/useAuth";

const EditarPerfil = () => {
  const { editarPerfil, auth, cambiarPassword } = useAuth();
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNuevo, setPasswordNuevo] = useState("");

  const { nombre, email } = auth;

  const handleSubmitPerfil = (e) => {
    e.preventDefault();

    editarPerfil({ email: nuevoCorreo, nombre: nuevoNombre });
    setNuevoCorreo("");
    setNuevoNombre("");
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const datos = { passwordActual, passwordNuevo };
    cambiarPassword(datos);
  };

  return (
    <>
      <div className="w-3/4 mx-auto lg:w-1/2 flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col border p-2 rounded shadow bg-white w-full items-center justify-center lg:py-10 py-5">
          <h2 className="text-sky-600 text-4xl mb-4 font-bold lg:text-6xl">
            Perfil Actual
          </h2>
          <div className="text-lg mb-4 lg:text-2xl">
            <p>
              Nombre: <span className="font-bold">{nombre}</span>
            </p>
            <p>
              Correo: <span className="font-bold text-md">{email}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col border p-2 rounded shadow bg-white w-full items-center justify-center lg:py-10 py-5">
          <h2 className="text-black text-3xl mb-4 font-bold lg:text-5xl">
            Editar Perfil
          </h2>
          <form
            onSubmit={handleSubmitPerfil}
            className="flex flex-col justify-center items-center lg:mt-8 gap-4">
            <label className="flex text-sm items-center justify-between w-full lg:text-xl">
              Nuevo Nombre:
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                className="bg-white text-black p-2 border rounded ml-2"
              />
            </label>
            <label className="flex text-sm items-center justify-between w-full lg:text-xl">
              Nuevo Correo:
              <input
                type="email"
                value={nuevoCorreo}
                onChange={(e) => setNuevoCorreo(e.target.value)}
                className="bg-white text-black p-2 border rounded ml-2"
              />
            </label>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 uppercase font-bold text-white px-4 py-2 rounded lg:px-20 lg:py-5 lg:text-xl lg:mt-7">
              Guardar Cambios
            </button>
          </form>
        </div>

        <div className="flex flex-col border p-2 rounded shadow bg-white w-full items-center justify-center lg:py-10 py-5">
          <h2 className="text-black text-2xl mb-4 font-bold lg:text-5xl">
            Cambiar Contraseña{" "}
          </h2>

          <form
            onSubmit={handleSubmitPassword}
            className="flex flex-col justify-center items-center lg:mt-8 gap-4">
            <label className="flex text-sm text-center items-center justify-between w-full lg:text-xl">
              Contraseña actual:{" "}
              <input
                type="text"
                value={passwordActual}
                onChange={(e) => setPasswordActual(e.target.value)}
                className="bg-white text-black p-2 border rounded ml-2"
              />
            </label>
            <label className="flex text-sm items-center text-center justify-between w-full lg:text-xl">
              Nueva Constraseña:{" "}
              <input
                type="text"
                value={passwordNuevo}
                onChange={(e) => setPasswordNuevo(e.target.value)}
                className="bg-white text-black p-2 border rounded ml-2"
              />
            </label>
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 uppercase font-bold text-white px-4 py-2 rounded lg:px-20 lg:py-5 lg:text-xl lg:mt-7">
              Cambiar Contraseña{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
