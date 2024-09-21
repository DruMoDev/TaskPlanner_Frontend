import { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AgregarColaborador = () => {
  const [email, setEmail] = useState("");
  const {
    buscarColaborador,
    colaborador,
    agregarColaborador,
    proyecto,
    obtenerColaboradoresById,
    eliminarColaborador,
  } = useProyectos();
  const { isDesktop } = useAuth();
  const { nombre } = colaborador;
  const [colaboradoresState, setColaboradoresState] = useState([{}]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        return;
      }
      await buscarColaborador(email);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleAgregarColaborador = async () => {
    try {
      await agregarColaborador(colaborador._id);
      toast.success(`${nombre} añadido correctamente!`);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleEliminarColaborador = async (id) => {
    try {
      await eliminarColaborador(id);
      toast.success("Colaborador eliminado correctamente.");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    const obtenerColaboradores = async () => {
      // Mapear los colaboradores y crear un array de promesas
      if (proyecto.colaboradores) {
        const promesas = proyecto.colaboradores.map(async (colaborador) => {
          return await obtenerColaboradoresById(colaborador);
        });

        // Esperar a que todas las promesas se resuelvan
        const colaboradores = await Promise.all(promesas);

        // Actualizar el estado con los colaboradores
        setColaboradoresState(colaboradores);
      }
    };

    obtenerColaboradores();
  }, [proyecto.colaboradores]);

  return (
    <>
      <h1 className="lg:text-4xl text-2xl text-center font-bold  ">
        Agregar Colaborador
      </h1>

      <div className="mt-10 flex justify-center items-center bg-white py-10 px-5 w-3/4 lg:w-2/4 rounded-lg shadow flex-col mx-auto">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit}
          name="formAgregarColaborador">
          <div className="mb-7">
            <label
              className="text-gray-700 uppercase font-bold text-sm lg:text-xl"
              htmlFor="email">
              Buscar Colaborador por Email
            </label>
            <input
              type="email"
              id="email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={nombre ? false : true}
            className={` mx-auto w-[250px] h-20 mb-7 text-3xl font-semibold text-center   transition-all ease-in ${
              nombre
                ? "bg-slate-300 hover:bg-slate-400 cursor-pointer rounded border border-black shadow-lg "
                : ""
            }`}
            onClick={nombre && handleAgregarColaborador}>
            {nombre && nombre}
          </button>

          <input
            type="submit"
            value={"Buscar colaborador"}
            className={`bg-sky-600 w-full uppercase p-3 font-bold text-white rounded transition-colors ${
              email
                ? "cursor-pointer hover:bg-sky-700"
                : "opacity-50 cursor-not-allowed"
            }`}
          />
          <div></div>
        </form>
        <button
          onClick={() => {
            window.history.back();
          }}
          className="bg-slate-600 text-white hover:bg-slate-700 transition-all shadow-md border px-10 rounded mt-5 font-bold uppercase py-2">
          Volver
        </button>
      </div>

      <div className="mt-10 flex items-center justify-center  flex-col">
        <h2 className="text-2xl font-bold mb-4 lg:text-4xl lg:mb-8">
          Colaboradores Actuales
        </h2>
        {colaboradoresState && (
          <div className="flex flex-col items-center gap-2">
            {colaboradoresState.map((colaborador, index) => (
              <div
                key={index}
                className="text-lg font-semibold bg-white shadow border lg:min-w-[500px] py-1 lg:text-2xl min-w-[300px] lg:pl-10 lg:pr-5 px-3 lg:py-2 flex justify-between items-center">
                <h4>
                  {colaborador.nombre} - {colaborador.email}
                </h4>

                <button
                  onClick={() => handleEliminarColaborador(colaborador._id)}>
                  <svg
                    className=" cursor-pointer text-red-600"
                    baseProfile="tiny"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height={`${isDesktop ? "2rem" : "1.5rem"}`}
                    width={`${isDesktop ? "2rem" : "1.5rem"}`}>
                    <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm.707-7l2.646-2.646a.502.502 0 000-.707.502.502 0 00-.707 0L12 11.293 9.354 8.646a.5.5 0 00-.707.707L11.293 12l-2.646 2.646a.5.5 0 00.707.708L12 12.707l2.646 2.646a.5.5 0 10.708-.706L12.707 12z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default AgregarColaborador;
