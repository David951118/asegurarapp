import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getVehiclesApi } from "../api/vehiculos";
import VehiclesList from "../components/VehiclesList";

export default function Map() {
  const [allVehicles, setAllVehicles] = useState([]);
  const [visibleVehicles, setVisibleVehicles] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    (async () => {
      await loadAllVehicles();
    })();
  }, []);

  const loadAllVehicles = async () => {
    try {
      const response = await getVehiclesApi();
      const vehicleArray = response.map((vehicle) => ({
        placa: vehicle.placa,
        estado: vehicle.clase_evento,
        latitud: vehicle.latitud,
        longitud: vehicle.longitud,
        velocidad: vehicle.velocidad,
        ubicacion: vehicle.ubicacion,
      }));
      setAllVehicles(vehicleArray);
      setVisibleVehicles(vehicleArray.slice(0, limit));
      setOffset(limit);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreVehicles = () => {
    const newOffset = offset + limit;
    const newVehicles = allVehicles.slice(offset, newOffset);
    setVisibleVehicles([...visibleVehicles, ...newVehicles]);
    setOffset(newOffset);
  };

  return (
    <SafeAreaView>
      <VehiclesList
        vehicles={visibleVehicles}
        loadMoreVehicles={loadMoreVehicles}
      />
    </SafeAreaView>
  );
}
