import { View, Text, StyleSheet, FlatList, Image } from "react-native";
//import Header from '../components/Header'
//import categories_data from '../data/categories_data.json'
import CategoryItem from "../components/CategoryItem";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/shopService";

const CategoriesScreen = ({ navigation }) => {
  //const categories = useSelector(state=>state.shopReducer.categories)
  const { data, isLoading, error } = useGetCategoriesQuery();

  const renderCategoryItem = ({ item }) => (
    <CategoryItem category={item} navigation={navigation} />
  );

  return (
    <>
      <Image
        source={require('../../assets/img/logo1.avif')}
        resizeMode="cover"
        style={styles.imageProduct}
      />
      
      <FlatList
        style={styles.categories}
        data={data}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
      />
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categories: {
    marginBottom: 90,
  },
  imageProduct: {
    minWidth: 300,
    width: '100%',
    height: 400,

  }
});
