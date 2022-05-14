export const paraId = () => {
  const paraId =
    Date.now().toString() + Math.random(36).toString().substring(2);
  return paraId;
};

export const formatearFechaES = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fechaNueva.toLocaleString("es-Es", opciones);
};

export const formatearFechaUS = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return fechaNueva.toLocaleString("en-US", opciones);
};

export const formatearNumero = (cantidad, currency = "USD") => {
  const text = cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });
  return text;
};
