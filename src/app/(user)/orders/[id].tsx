import { View, Text, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import orders from "@/assets/data/orders";
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = orders.filter(item => item.id === +id)[0];

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: `Order #${id}`}}/>

        <OrderListItem order={order}/>

        <FlatList
          data={order.order_items}
          contentContainerStyle={{gap: 10}}
          renderItem={({item}) => <OrderItemListItem order_item={item} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      gap: 10,
      padding: 10
    }
});

export default ProductDetailsScreen;