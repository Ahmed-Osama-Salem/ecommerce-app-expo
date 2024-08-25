import { ProductResponse } from "@/Redux/slices/productSlice";
import React from "react";
import { View, Text } from "react-native";

const ProductDetails: React.FC<ProductResponse> = ({
  title,
  price,
  description,
}) => (
  <View className="mt-6 px-4">
    <Text className="text-2xl font-semibold text-gray-800">{title}</Text>
    <View className="flex-row items-center mt-2">
      <Text className="text-lg font-bold text-green-600">{`£${price}`}</Text>
      <Text className="text-sm text-gray-500 ml-2">from £14 per month</Text>
    </View>
    <Text className="text-sm text-gray-600 mt-2">{description}</Text>
  </View>
);

export default ProductDetails;
