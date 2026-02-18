import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { GlobalContext } from "../context/GlobalContext";

const Profile = () => {
  const [placasView, setPlacasView] = useState([]);
  const { placas } = useContext(GlobalContext);
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://cellviapi.asegurar.com.co/seguridad/usuario/persona",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUser(response.data);
        setPlacasView(placas);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userToken]);

  if (!user) {
    return (
      <SafeAreaView style={styles.container} className="items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const renderVehicleItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.placa}</Text>
      <Text style={styles.tableCell}>{item.estado}</Text>
      <Text style={styles.tableCell}>30 de agosto</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} className="">
      <StatusBar barStyle="dark-content" />
      <View style={styles.header} className="mt-3 mx-4">
        <Text style={styles.title}>Bienvenido a tu perfil</Text>
        <View className="space-x-2 px-2 pb-2">
          <Icon
            name="bars"
            color={"grey"}
            size={25}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="p-2"
          />
        </View>
      </View>
      <Text
        className="mx-4"
        style={styles.name}
      >{`${user.persona_nombre} ${user.persona_apellido}`}</Text>
      <View style={styles.photoContainer}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
          style={styles.photo}
        />
      </View>
      <View className="mx-3">
        <Text style={styles.label}>Identificación:</Text>
        <Text style={styles.value}>{user.persona_identificacion}</Text>
      </View>
      <View className="mx-3">
        <Text style={styles.tableTitle}>Vehículos</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Placa</Text>
          <Text style={styles.tableHeaderCell}>Estado</Text>
          <Text style={styles.tableHeaderCell}>Siguiente Pago</Text>
        </View>
      </View>

      <FlatList
        className="mx-3"
        data={placasView}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => item.placa}
        style={styles.table}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    width: "33%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    width: "33%",
  },
});

export default Profile;
