import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import { toast } from "react-toastify";

const AgregarColaborador = () => {
  const [email, setEmail] = useState("");
  const { buscarColaborador, colaborador, agregarColaborador, proyecto } =
    useProyectos();
  const { nombre } = colaborador;

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

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <h1 className="text-4xl font-black  ">Agregar Colaborador</h1>
      <div className="mt-10 flex justify-center items-center">
        <form
          className="bg-white py-10 px-5 w-1/2 rounded-lg shadow flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-7">
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor="email"
            >
              Buscar Colaborador{" "}
            </label>
            <input
              type="email"
              id="email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Buscar por email"
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
            onClick={nombre && handleAgregarColaborador}
          >
            {nombre && nombre}
          </button>

          <input
            type="submit"
            value={"Buscar colaborador"}
            className="bg-sky-600 w-full uppercase p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          />
          <div></div>
        </form>
      </div>
    </>
  );
};
export default AgregarColaborador;