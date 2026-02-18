import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import pastoImage from "../assets/pasto.jpeg";
import imagen from "./../assets/delivery-truck_4947193.png";
import Icon from "react-native-vector-icons/FontAwesome5";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function PointCard({ item }) {
  const navigation = useNavigation();
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("MapVehicle", { ...item })}
    >
      <View
        style={{
          shadowColor: themeColors.bgColor(0.2),
          shadowRadius: 7,
        }}
        className="mr-6 bg-white rounded-3xl shadow-lg"
      >
        <Image className="h-36 w-64 rounded-t-3xl" source={pastoImage} />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{item.placa}</Text>
          <View className=" flex-row items-center space-x-1">
            <Image className="h-4 w-4 rounded-t-3xl" source={imagen} />
            <Text className="text-xs">
              {/* <Text className="text-green-700">{item.latitud}</Text>
              <Text className="text-red-700">{item.longitud}</Text> */}
              <Text className="text-grey-700">
                {" "}
                Estado{" "}
                <Text className="font-semibold">
                  {truncateText(item.estado, 20)}
                </Text>
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon name="map" color={"gray"} size={15} />
            <Text className="text-grey-700 text-s">
              {truncateText(item.ubicacion, 20)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
