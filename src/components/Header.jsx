import useProyectos from "../hooks/useProyectos";

const Header = () => {
  const { proyecto } = useProyectos();
  let path;
  if (window.location.pathname.includes("proyectos")) {
    path = "Proyectos";
  }

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h2 className="text-4xl text-sky-600 font-black text-center">
            UpTask
          </h2>
          <span className="text-2xl text-sky-600 font-black text-center">
            |
          </span>
          <h2 className="text-3xl text-sky-600 font-black text-center">
            Dashboard
          </h2>

          {path && (
            <>
              <span className="text-2xl text-sky-600 font-black text-center">
                |
              </span>
              <h2 className="text-2xl text-sky-600 font-black text-center">
                {path}
              </h2>
            </>
          )}
          {proyecto.nombre && (
            <>
              <span className="text-2xl text-sky-600 font-black text-center">
                |
              </span>
              <h2 className="text-2xl text-sky-600 font-black text-center">
                {proyecto.nombre}
              </h2>
            </>
          )}
        </div>
        {/* 
        TODO: Darle funcionalidad al boton de buscar proyectos
         */}
        <div className="flex gap-10">
          <input
            type="search"
            placeholder="Buscar Proyecto"
            className="rounded-lg w-80 block p-2 border"
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-white text-sm bg-sky-600 hover:bg-sky-700 transition-all ease-in p-3 rounded-md uppercase font-bold "
              onClick={handleCerrarSesion}
            >
              Cerrar Sessión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
