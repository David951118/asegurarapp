import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import Account from "../screens/Account";
import Profile from "../screens/Profile";
import MapVehicle from "../screens/MapVehicle";
import Traceability from "../screens/Traceability";
import CustomDrawerContent from "../components/CustomDrawerContent"; // Asegúrate de que este archivo exista

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerPosition: "right" }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="MapVehicle" component={MapVehicle} />
      <Drawer.Screen name="Traceability" component={Traceability} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
