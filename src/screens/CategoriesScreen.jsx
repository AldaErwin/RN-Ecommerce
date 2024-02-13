import {StyleSheet, FlatList, Image} from 'react-native'
import CategoryItem from '../components/CategoryItem'
import { useGetCategoriesQuery } from '../services/shopService'

const CategoriesScreen = ({navigation}) => {

    const {data, isLoading, error} = useGetCategoriesQuery()

    const renderCategoryItem = ({item}) => (
        <CategoryItem category={item} navigation={navigation} />
    )

    return(
        <>
          <Image
        source={require("../../assets/img/logo1.avif")}
        resizeMode="cover"
        style={styles.imageCompany}
      />
        <FlatList style={styles.categories}
            data={data}
            renderItem={renderCategoryItem}
            keyExtractor={item=>item}
        />
        
        </>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  categories: {
    marginBottom: 10,
  },
  Categories2:{
    
  },

  imageCompany: {
    minWidth: 300,
    width: "100%",
    height: 400,
  },
});

