import { View, Text, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { OrderStatusList, PizzaSize } from '@/src/types';
import orders from "@/assets/data/orders";
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import Colors from '@/src/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = orders.filter(item => item.id === +id)[0];

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: `Order #${id}`}}/>

        <FlatList
          data={order.order_items}
          contentContainerStyle={{gap: 10}}
          renderItem={({item}) => <OrderItemListItem order_item={item} />}
          ListHeaderComponent={() => <OrderListItem order={order}/>}
          ListFooterComponent={() => (
            <>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => console.warn('Update status')}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order.status === status ? 'white' : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
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