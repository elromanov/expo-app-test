import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { OrderItem } from "../types";
import { defaultPizzaImage } from "./ProductListItem";
import Colors from "../constants/Colors";

type OrderListItemsProps = {
    order_item: OrderItem;
}

const OrderItemListItem = ({ order_item } : OrderListItemsProps) => {
    return(
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    source={{ uri: order_item.products.image || defaultPizzaImage }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text>{order_item.products.name}</Text>
                    <View style={styles.leftTextContainer}>
                        <Text style={styles.price}>€{order_item.products.price}</Text>
                        <Text>Size: {order_item.size}</Text>
                    </View>
                </View>
            </View>
            {/* <View> */}
            <Text style={styles.quantity}>{order_item.quantity}</Text>
            {/* </View> */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        // gap: 5,
    },
    leftTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // margin: 5,
        gap: 5
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 5,
    },
    quantity: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default OrderItemListItem;