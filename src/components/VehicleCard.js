import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import getColorByReport from "../utils/getColorByReport";
import { capitalize } from "lodash";
import imagen from "./../assets/delivery-truck_4947193.png";

export default function VehicleCard(props) {
  const { vehicle } = props;
  const navigation = useNavigation();
  const vehicleColor = getColorByReport(vehicle.estado);
  const bgStyles = { backgroundColor: vehicleColor, ...styles.bgStyles };
  const lat = vehicle.latitud;
  const lon = vehicle.longitud;
  const apiKey = "AIzaSyC6quxArYbSqYysx-9lSnga5roPbelHxj4"; // Reemplaza con tu API key

  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=12&size=100x100&key=${apiKey}`;

  const goToVehicle = () => {
    navigation.navigate("CarMap", { vehicle });
  };

  return (
    <TouchableWithoutFeedback onPress={goToVehicle}>
      <View style={styles.card}>
        <View style={[bgStyles]}>
          <View style={styles.content}>
            <Image source={{ uri: imageUrl }} style={styles.mapThumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.plate}>Placa: {vehicle.placa}</Text>
              <Text style={styles.plate}>Posicion {vehicle.ubicacion}</Text>
              <Text style={styles.plate}>{capitalize(vehicle.estado)}</Text>
              <Image source={imagen} style={styles.image} />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
  },
  bgStyles: {
    height: 170,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  mapThumbnail: {
    width: 100,
    height: 140,
    resizeMode: "cover",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  plate: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
