import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { featured } from "../utils/constants";
import { categories } from "../utils/constants";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {featured.map((category, index) => {
          let isActive = category.id === activeCategory;
          let btnClass = isActive? "bg-gray-400" : "bg-gray-200";
          let textClass = isActive? "font-semibold text-gray-800" : "text-gray-500";
          return (
            <View
              key={index}
              className="flex justify-center items-center mr-6 "
            >
              <TouchableOpacity
                onPress={() => setActiveCategory(category.id)}
                className={`p-1 rounded-full shadow bg-gray-200 ${btnClass}`}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={categories[0].image}
                />
              </TouchableOpacity>
              <Text className={`text-sm ${textClass}`}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
