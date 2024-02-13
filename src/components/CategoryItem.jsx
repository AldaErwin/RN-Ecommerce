import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Card from './Card'
import { useDispatch } from "react-redux"
import { setCategorySelected } from "../features/shopSlice"

const CategoryItem = ({ category, navigation }) => {

    const dispatch = useDispatch()

    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate("products",{category})
            dispatch(setCategorySelected(category))
            }
            }>
            <Card style={styles.cardContainer}>
                <Text style={styles.text}>{category}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        justifyContent:"center",
        alignItems:"center",
        margin: 10,
        height:80
    },
    text: {
        textTransform: 'capitalize',
        fontSize: 15
    }
})