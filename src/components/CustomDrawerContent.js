import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate("Home")}
          icon={({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="Trazabilidad"
          onPress={() => props.navigation.navigate("Traceability")}
          icon={({ color, size }) => (
            <Icon name="globe" color={color} size={size} />
          )}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="Perfil"
          onPress={() => props.navigation.navigate("Profile")}
          icon={({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          )}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="Cerrar Sesión"
          onPress={() => signOut()}
          icon={({ color, size }) => (
            <Icon name="sign-out-alt" color={color} size={size} />
          )}
          style={styles.drawerItem}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerItem: {
    marginVertical: 10,
  },
});
