import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProductHeader: React.FC = () => {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center px-4 mt-2">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View className="flex-row space-x-4">
        <TouchableOpacity>
          <Ionicons name="heart" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductHeader;
