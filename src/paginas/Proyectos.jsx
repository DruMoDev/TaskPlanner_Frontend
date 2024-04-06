import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";

const Proyectos = () => {
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="lg:text-4xl text-2xl font-black lg:ml-0 ml-5">
        Proyectos
      </h1>
      <div className="mt-10 flex flex-col gap-5 min-h-[500px]">
        {proyectos.length ? (
          proyectos.map((proyecto, index) => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
              index={index}
            />
          ))
        ) : (
          <h4 className="text-center mt-52 text-xl font-bold">
            Visualiza tus nuevos proyectos aquí.
          </h4>
        )}
      </div>
    </>
  );
};
export default Proyectos;
