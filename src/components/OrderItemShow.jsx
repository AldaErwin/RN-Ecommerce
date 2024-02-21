import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React from 'react'
import Card from './Card'
import { Feather } from '@expo/vector-icons';

const OrderItemShow = ({ order, setOrderId}) => {
    let date = new Date(order.createAt)
    date = date.toLocaleString()
    setOrderId(order.orderId)
    return (
        <Card style={styles.cartItemContainer}>
            <View >
                <Text style={styles.createdAt}>
                    Creada el {date}
                </Text>
                <Text style={styles.total}>Total: ${order.total}</Text>
            </View>
        </Card>
    )
}

export default OrderItemShow

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    searchIcon: {
        marginLeft: 'auto',
    },
    createdAt:{
        fontFamily: 'Karla-regular',
        marginBottom:5,
    },
    total:{
        fontFamily: 'Karla-Bold',
        fontSize:14,
    }
})