import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RootState, store } from "@/Redux/store";
import { fetchSingleProduct } from "@/Redux/slices/singleProductSlice";
import { useSelector } from "react-redux";
import { addToCart, Cart } from "@/Redux/slices/cart/addToCartSlice";
import ProductHeader from "@/components/SingleProduct/ProductHeader";
import ProductDetails from "@/components/SingleProduct/ProductDetails";
import { ProductResponse } from "@/Redux/slices/productSlice";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = () => {
  const { id } = useLocalSearchParams();
  const { product } = useSelector((state: RootState) => state.singleProduct);
  const router = useRouter();

  useEffect(() => {
    store.dispatch(fetchSingleProduct({ productId: id })).unwrap();
  }, [id]);

  const handleAddToCart = () => {
    const cart = {
      userId: 2,
      date: "2020-02-03",
      products: [{ productId: id, quantity: 1 }],
    } as unknown as Cart;
    store
      .dispatch(addToCart(cart))
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Item added to cart 👋",
        });
        router.push("/cart");
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView
        className="flex-grow bg-gray-50"
        keyboardShouldPersistTaps="handled"
      >
        <ProductHeader />
        <View className="w-full items-center mt-4 bg-gray-50">
          <Image
            source={{ uri: product?.image }}
            className="h-80 w-80"
            resizeMode="contain"
          />
        </View>
        <View className="flex-row h-full flex  rounded-t-[25px] shadow-md bg-white">
          <ProductDetails {...(product as ProductResponse)} />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddToCart}
        className="bg-primary  py-4 rounded-xl absolute bottom-[70px] left-4 right-4"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Add to cart
        </Text>
      </TouchableOpacity>

      <Text className="text-center text-gray-500 text-sm mt-2">
        Delivery on 26 October
      </Text>
    </SafeAreaView>
  );
};

export default Product;
