import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";

export default function HistoryIcons({ onPress }) {
  return (
    <View className="absolute bottom-5 w-full z-50 px-5">
      <TouchableOpacity
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="flex-row justify-between items-center rounded-full p-4 py-3 shadow-lg"
        onPress={onPress}
      >
        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          Mirar trazabilidad
        </Text>
      </TouchableOpacity>
    </View>
  );
}
