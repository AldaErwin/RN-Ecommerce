import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Card from './Card'
import { Feather } from '@expo/vector-icons';

const OrderItem = ({ order, setOrderId, setmodalVisible}) => {
    let date = new Date(order.createAt)
    date = date.toLocaleString()
    return (
        <Card style={styles.cartItemContainer}>
            <View >
                <Text style={styles.createdAt}>
                    Creada el {date}
                </Text>
                <Text style={styles.total}>Total: ${order.total}</Text>
            </View>
            <TouchableOpacity style={styles.searchIcon} onPress={()=>{
                setOrderId(order.orderId)
                setmodalVisible(true)
            }
                }>
                <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
        </Card>
    )
}

export default OrderItem

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