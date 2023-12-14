import {View, Text, StyleSheet, FlatList} from 'react-native'
//import Header from '../components/Header'
import categories_data from '../data/categories_data.json'
import CategoryItem from '../components/CategoryItem'
import colors from '../global/colors'

const CategoriesScreen = ({navigation}) => {

    const renderCategoryItem = ({item}) => (
        <CategoryItem category={item} navigation={navigation} />
    )

    return(
        <>
        {/* <Header title="Categorías" /> */}
        <FlatList

            data={categories_data}
            renderItem={renderCategoryItem}
            keyExtractor={item=>item}
            style={styles.Container}
        />
        </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#ccc'
    }
})