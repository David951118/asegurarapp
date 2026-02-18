// utils.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";

// Función para realizar el login
//GMSServices.provideAPIKey("AIzaSyAs6NK-XsLsuGn6vhrrZQhYgoy8mALNazs")
export const login = async (credentials) => {
  const loginUrlString =
    "https://cellviapi.asegurar.com.co/" + "api/login_check";
  const jsonData = JSON.stringify(credentials);

  try {
    const response = await fetch(loginUrlString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    const status = response.status;

    if (status === 200) {
      const result = await response.json();
      await AsyncStorage.setItem("token", result.token);
      await AsyncStorage.setItem("persona", result.data.persona);
      await AsyncStorage.setItem("username", credentials.username);
      await AsyncStorage.setItem("password", credentials.password);

      //getFCMToken();
      return { success: true, token: result.token };
    } else if (status === 401) {
      alert("Usuario o Clave incorrecto");
      return { success: false };
    } else {
      alert("Error en el servidor");
      return { success: false };
    }
  } catch (error) {
    console.error("Login failed", error);
    alert("No hay conexión con el servidor");
    return { success: false };
  }
};

// Función para obtener el token de FCM
export const getFCMToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log("FCM Token:", fcmToken);
    getIosToken(fcmToken);
  } catch (error) {
    console.error("Error fetching FCM token:", error);
  }
};

// Función para registrar el token de iOS
export const getIosToken = async (remoteToken) => {
  try {
    const getIosUrlString = "TU_API_URL" + "seguridad/usuario/ios_token";
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(getIosUrlString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const status = response.status;

    if (status === 200) {
      const data = await response.json();
      if (remoteToken !== data.ios) {
        appRegister(remoteToken);
      }
    } else if (status === 401) {
      alert("Usuario sin autorización");
      cleanDefaults();
    } else {
      alert("Error en el servidor");
    }
  } catch (error) {
    console.error("Error fetching iOS token:", error);
  }
};

// Función para registrar la aplicación con el nuevo token de iOS
export const appRegister = async (token) => {
  try {
    const appRegisterUrlString =
      "TU_API_URL" + "seguridad/usuario/registrar_app";
    const jsonData = JSON.stringify({ ios: token });
    const authToken = await AsyncStorage.getItem("token");

    const response = await fetch(appRegisterUrlString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: jsonData,
    });

    const status = response.status;

    if (status === 200) {
      console.log("Cambio token correcto");
    } else if (status === 401) {
      console.log("Usuario sin autorización");
      cleanDefaults();
    } else {
      console.log("Error en el servidor");
    }
  } catch (error) {
    console.error("Error registering app:", error);
  }
};

// Función para limpiar los datos guardados en AsyncStorage
export const cleanDefaults = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const getVehiclesList = async (token) => {
  const getVehiclesUrlString = `${API_HOST}movil/v2/vehiculos/usuario`;

  try {
    const response = await fetch(getVehiclesUrlString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const status = response.status;

    if (status === 200) {
      const vehicles = await response.json();4
      return { success: true, vehicles };
    } else if (status === 204) {
      alert("No hay vehículos asignados");
      return { success: false };
    } else if (status === 401) {
      alert("Usuario sin autorización");
      await cleanDefaults();
      return { success: false };
    } else {
      alert("Error en el servidor");
      return { success: false };
    }
  } catch (error) {
    console.error("Failed to fetch vehicles", error);
    alert("No hay conexión con el servidor");
    return { success: false };
  }
};