import formatearFecha from "./formatearFecha";

const formFecha = (fecha) => {
    const partesFecha = formatearFecha(fecha).split("/");
    const fechaReordenada = [partesFecha[2], partesFecha[1], partesFecha[0]];
    const fechaEntregaFinal = fechaReordenada.join("-");
    return fechaEntregaFinal;
  };

  export default formFecha