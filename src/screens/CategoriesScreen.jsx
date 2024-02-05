import { View, Text, StyleSheet, FlatList, Image,ActivityIndicator } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/shopService";
import ProductItem from '../components/ProductItem'
import { useState, useEffect } from 'react'
import { useGetProductsByCategoryQuery } from '../services/shopService'


const CategoriesScreen = ({ navigation }) => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  const renderCategoryItem = ({ item }) => (
    <CategoryItem category={item} />
  );

  const [productsByCategory, setProductsByCategory] = useState([])
    const [search, setSearch] = useState('')
    const category = useSelector(state=>state.shopReducer.categorySelected)
    const {data: productsFilteredByCategory} = useGetProductsByCategoryQuery(category)

    useEffect(()=>{
        //const productsFilteredByCategory = products_data.filter(product=>product.category===category)
        if(!isLoading){
            const productsValues = Object.values(productsFilteredByCategory)
            const productsFiltered = productsValues.filter(
            product=>product.title.toLowerCase().includes(search.toLowerCase()))
            setProductsByCategory(productsFiltered)
        }
    },[isLoading,category, search])

    const renderProductItem = ({item}) => (
        <ProductItem product={item} navigation={navigation}  />
    )

  return (
    <>
      <Image
        source={require("../../assets/img/logo1.avif")}
        resizeMode="cover"
        style={styles.imageCompany}
      />
    
      <FlatList
        style={styles.categories}
        data={data}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal={true}
        />
        <FlatList
        style={styles.Categories2}
        data={productsByCategory}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}

      />
    </>
  );
};

export default CategoriesScreen;

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

