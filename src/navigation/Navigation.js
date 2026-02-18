// Navigation.js
import React, { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator"; // Asegúrate de que este archivo exista
import Account from "../screens/Account";
import LoadingScreen from "../screens/LoadingScreen";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de que este archivo exista
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { userToken } = useContext(AuthContext); // Obtén el token del contexto
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoading(false);
      // Llama a la función para guardar el token en el contexto si es necesario
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Screen name="Account" component={Account} />
      ) : (
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
}
