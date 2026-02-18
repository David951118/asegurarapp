import { VEHICLE_TYPE_COLORS } from "./constants";

const getColorByReport = (type) => {
  return VEHICLE_TYPE_COLORS[type] || "#199"; // Color por defecto si no se encuentra el tipo
};

export default getColorByReport;
