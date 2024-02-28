import { Pressable, StyleSheet, Text, View } from "react-native";
import { Order } from "../types";
import relativeTime from 'dayjs/plugin/relativeTime';
import { default as dayjs } from 'dayjs';
import { Link, useSegments } from "expo-router";

type OrderListItemProps = {
    order: Order;
}

const OderItemList = ({ order } : OrderListItemProps) => {

    const udpateLocale = require('dayjs/plugin/updateLocale');
    const relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(udpateLocale);
    dayjs.extend(relativeTime);

    const segments = useSegments();

    return(
        <Link href={`${segments[0]}/orders/${order.id}`} asChild>
            <Pressable style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.title}>Order #{order.id}</Text>
                    <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
                </View>
                <View>
                    <Text style={styles.status}>Delivering</Text>
                </View>
            </Pressable>
        </Link>
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
    leftContainer: {
        gap: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    time: {
        color: 'gray',
    },
    status: {
        fontWeight: '600',
    }
});

export default OderItemList;