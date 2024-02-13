import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
//import cart_data from "../data/cart_data.json"
import CartItem from '../components/CartItem'
import { colors } from '../global/colors'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopService';
import { clearCart } from '../features/cartSlice';

const CartScreen = ({navigation}) => {
    
    const user = useSelector(state=>state.authReducer.user)
    const cartItems = useSelector(state=>state.cartReducer.items)
    const total = useSelector(state=>state.cartReducer.total)
    const [triggerPost, result] =  usePostOrderMutation()

    const dispatch = useDispatch()
    const clearCartSet = ()=>{
      dispatch(clearCart())
    }
    const confirmCart = ()=>{
      triggerPost({total,cartItems,user:user })
      navigation.navigate("Categorías")
      clearCartSet()
    }
    
    const renderCartItem = ({item}) => (
        <CartItem item={item} />
    )

    return (
        <View style={styles.cartContainer}>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
            />
            <View style={styles.cartConfirm}>
                <Text style={styles.totalPrice}>Total: USD {total}</Text>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmCart}>
                    <Text style={styles.textConfirm}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={clearCartSet}>
                    <Text style={styles.textConfirm}>Vaciar Carrito</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
      flex: 1,
    },
    cartConfirm: {
      marginBottom: 130,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 25,
    },
    totalPrice: {
      fontSize: 16,
      fontFamily: 'Karla-Bold'
    },
    confirmButton:{
      backgroundColor: colors.secondary,
      padding:10,
      borderRadius:10,
    },
    clearButton:{
      backgroundColor: colors.clear,
      padding:10,
      borderRadius:10,
    },
    textConfirm:{
      fontFamily:'Karla-Bold',
      fontSize:16,
      color: '#fff'
    }  
  })