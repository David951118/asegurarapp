import { StyleSheet, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import VehicleCard from "./VehicleCard";

export default function VehiclesList(props) {
  const { vehicles, loadMoreVehicles } = props;

  return (
    <FlatList
      data={vehicles}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(vehicle) => vehicle.placa}
      renderItem={({ item }) => (
        <VehicleCard vehicle={item} />
      )}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={loadMoreVehicles}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color="#AEAEAE"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});
