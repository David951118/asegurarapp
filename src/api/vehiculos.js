import { API_HOST } from "../utils/constants";

export async function getVehiclesApi(url) {
  try {
    const url = `${API_HOST}/eva814/exp099`; //ordenar por alfabeto
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getVehicleDetailApi() {
  try {
    const url = `${API_HOST}/marcoa496/cbl4011`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
