import { View, FlatList, Text } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@components/ProductListItem';
import { Stack } from 'expo-router';
import orders from "@/assets/data/orders";
import OrderListItem from '@/src/components/OrderListItem';

export default function OrderScreen() {
  return (
    <View>
        <Stack.Screen options={{title: "Orders"}}/>
        <FlatList 
            data={orders}
            contentContainerStyle={{gap: 10, padding: 10}}
            renderItem={(item) => <OrderListItem order={item.item}/>}
        />
    </View>
  );
}