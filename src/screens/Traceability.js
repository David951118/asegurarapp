import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { GlobalContext } from "../context/GlobalContext";
import TraceabilityModal from "../components/TraceabilityModal";

const Traceability = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [traceabilityDates, setTraceabilityDates] = useState({
    start: "",
    end: "",
  });
  const [region, setRegion] = useState(null);
  const { placas } = useContext(GlobalContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (placas.length > 0) {
      const bounds = placas.reduce(
        (acc, vehicle) => {
          acc.minLat = Math.min(acc.minLat, vehicle.latitud);
          acc.maxLat = Math.max(acc.maxLat, vehicle.latitud);
          acc.minLng = Math.min(acc.minLng, vehicle.longitud);
          acc.maxLng = Math.max(acc.maxLng, vehicle.longitud);
          return acc;
        },
        {
          minLat: placas[0].latitud,
          maxLat: placas[0].latitud,
          minLng: placas[0].longitud,
          maxLng: placas[0].longitud,
        }
      );

      setRegion({
        latitude: (bounds.minLat + bounds.maxLat) / 2,
        longitude: (bounds.minLng + bounds.maxLng) / 2,
        latitudeDelta: (bounds.maxLat - bounds.minLat) * 1.2,
        longitudeDelta: (bounds.maxLng - bounds.minLng) * 1.2,
      });
    }
  }, [placas]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitDates = (startDate, endDate) => {
    setTraceabilityDates({ start: startDate, end: endDate });
    setModalVisible(false);
    // Aquí puedes añadir la lógica para manejar las fechas de trazabilidad
    console.log("Fechas seleccionadas:", startDate, endDate);
  };

  if (!region) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
      >
        {placas.map((vehicle) => (
          <Marker
            key={vehicle.placa}
            coordinate={{
              latitude: vehicle.latitud,
              longitude: vehicle.longitud,
            }}
            title={vehicle.placa}
            description={vehicle.ubicacion}
          />
        ))}
      </MapView>
      <View style={styles.header}>
        <Icon
          name="bars"
          color={"grey"}
          size={25}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            /* Mostrar todos los vehículos */
          }}
        >
          <Text style={styles.buttonText}>Mostrar Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText}>Seleccionar Fechas</Text>
        </TouchableOpacity>
      </View>
      <TraceabilityModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitDates}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Traceability;
