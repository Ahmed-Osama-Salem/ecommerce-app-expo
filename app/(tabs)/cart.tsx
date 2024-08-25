import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/Redux/slices/cart/cartSlice";
import { fetchSingleProduct } from "@/Redux/slices/singleProductSlice";
import { RootState } from "@/Redux/store";
import DeliveryAddress from "@/components/Cart/DeliveryAddress";
import SelectAllCart from "@/components/Cart/SelectAllCart";
import CartItem from "@/components/Cart/CartItem";
import CheckoutButton from "@/components/Cart/CheckoutButton";
import CartHeader from "@/components/Cart/CartHeader";

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartList.cart);
  const cartStatus = useSelector((state: RootState) => state.cartList.status);
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );

  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    dispatch(fetchCartItems(2))
      .unwrap()
      .then((res: any) => {
        res.products.forEach((item: any) => {
          dispatch(fetchSingleProduct({ productId: item.productId }));
        });
      });
  }, [dispatch]);

  const toggleSelectItem = (productId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedItems).every(
      (selected) => selected
    );
    const newSelectionState =
      cart?.products.reduce((acc, item) => {
        acc[item.productId] = !allSelected;
        return acc;
      }, {} as { [key: number]: boolean }) || {};

    setSelectedItems(newSelectionState);
  };

  if (cartStatus === "loading" || status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#C3E600" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CartHeader />

      <DeliveryAddress />

      <FlatList
        data={cart?.products || []}
        keyExtractor={(item) => item.productId.toString()}
        ListHeaderComponent={
          <SelectAllCart
            allSelected={Object.values(selectedItems).every(
              (selected) => selected
            )}
            toggleSelectAll={toggleSelectAll}
          />
        }
        renderItem={({ item }) => {
          const product = products[item.productId];
          const isSelected = !!selectedItems[item.productId];
          return (
            <CartItem
              item={item}
              product={product}
              isSelected={isSelected}
              toggleSelectItem={toggleSelectItem}
            />
          );
        }}
      />

      <CheckoutButton />
    </SafeAreaView>
  );
};

export default CartScreen;
