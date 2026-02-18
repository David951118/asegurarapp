import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { themeColors } from "../theme";
import Icon from "react-native-vector-icons/FontAwesome5";
import imagen from "./../assets/delivery-truck_4947193.png";
import HistoryIcons from "../components/HistoryIcons";
import TraceabilityModal from "../components/TraceabilityModal";

export default function MapVehicle() {
  const [modalVisible, setModalVisible] = useState(false);
  const [traceabilityDates, setTraceabilityDates] = useState({
    start: "",
    end: "",
  });
  const [region, setRegion] = useState(null);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const navigation = useNavigation();
  const { params } = useRoute();
  let item = params;

  useEffect(() => {
    setRegion({
      latitude: item.latitud,
      longitude: item.longitud,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, [item]);

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
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="relative">
          <MapView style={{ width: "100%", height: 520 }} region={region}>
            <Marker
              coordinate={{
                latitude: item.latitud,
                longitude: item.longitud,
              }}
              title={item.placa}
              description={item.ubicacion}
            />
          </MapView>
          <TouchableOpacity
            style={{ position: "absolute", top: 14, left: 15 }}
            className="bg-gray-50 rounded-full shadow"
            onPress={() => navigation.goBack()}
          >
            <View
              style={{ backgroundColor: themeColors.bgColor(1) }}
              className="p-3 rounded-full"
            >
              <Icon name="arrow-left" color={"white"} size={20} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">Placa: {item.placa}</Text>
            <View className="flex-row space-x-2 my-1 ">
              <View className=" flex-row items-center space-x-1">
                <Image className="h-4 w-4 rounded-t-3xl" source={imagen} />
                <Text className="text-lg">
                  <Text className="text-grey-700">
                    {" "}
                    Estado <Text className="font-semibold">{item.estado}</Text>
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="pb-36 bg-gray-50 ">
          <Text className="px-4 py-4 text-3xl font-bold">Localización</Text>
          <Text className="text-gray-500 mt-2 px-4 text-xl font-bold">
            Latitud: {item.latitud}
          </Text>
          <Text className="text-gray-500 mt-2 px-4 text-xl font-bold">
            Longitud: {item.longitud}
          </Text>
          <Text className="text-gray-500 mt-2 px-4 text-xl font-bold">
            Ubicación: {truncateText(item.ubicacion, 50)}
          </Text>
        </View>
      </ScrollView>
      <HistoryIcons onPress={handleOpenModal} />
      <TraceabilityModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitDates}
      />
    </SafeAreaView>
  );
}
