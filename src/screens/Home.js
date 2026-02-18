import { useState, useEffect, useContext } from "react";
import { SafeAreaView, TextInput, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getVehiclesList } from "../utils/utils";
import { StatusBar } from "expo-status-bar";
import Categories from "../components/Categories";
import { featured } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeaturedRow from "../components/FeaturedRow";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { GlobalContext } from "../context/GlobalContext";

export default function HomeScreen() {
  const { setPlacas } = useContext(GlobalContext);
  const [allVehicles, setAllVehicles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await loadAllVehicles();
    })();
  }, []);

  const loadAllVehicles = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        const response = await getVehiclesList(userToken);
        if (response.success) {
          const vehicleArray = response.vehicles.map((vehicle) => ({
            placa: vehicle.placa,
            estado: vehicle.estado,
            latitud: vehicle.latitud,
            longitud: vehicle.longitud,
            velocidad: vehicle.velocidad,
            ubicacion: vehicle.ubicacion,
            id: vehicle.id,
          }));
          setAllVehicles(vehicleArray);
          setPlacas(vehicleArray);
        } else {
          console.error("Failed to fetch vehicles");
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon name="search" color={"gray"} size={25} />
          <TextInput placeholder="Busqueda" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon name="map" color={"gray"} size={20} />
            <Text className="text-gray-600">Pasto </Text>
          </View>
        </View>
        <View className="p-2 rounded-full">
          <Icon
            name="bars"
            color={"grey"}
            size={25}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Categories />
        <View className="mt-5">
          {featured.map((item, index) => (
            <FeaturedRow
              key={index}
              title={item.name}
              points={allVehicles}
              description={item.description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
