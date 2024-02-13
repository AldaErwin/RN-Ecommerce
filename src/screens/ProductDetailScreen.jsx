import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
//import Header from '../components/Header'
import { colors } from "../global/colors";
import { useSelector, useDispatch } from "react-redux";
import { setProductSelected } from "../features/shopSlice";
//import Carousel from '../components/Carousel'
import { addItem } from "../features/cartSlice";
import { decrement, increment, reset } from "../features/counterSlice";
import Container, { Toast } from 'toastify-react-native';


const ProductDetailScreen = ({ route }) => {
  //const [productSelected, setProductSelected] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [isPortrait, setIsPortrait] = useState(true);

  const { height, width } = useWindowDimensions();

  const productId = route.params;
  const quantityState = useSelector((state) => state.counterReducer.counter);
  const productSelected = useSelector((state) => state.shopReducer.productSelected);

  const handleSubmit = async () => {
    Toast.success('Agregado al carrito','top',animationOutTiming=800);
  };

  const dispatch = useDispatch();

  const counterIncrement = () => {
    dispatch(increment());
  };

  const counterDecrement = () => {
    dispatch(decrement());
  };

  useEffect(() => {
    height < width ? setIsPortrait(false) : setIsPortrait(true);
  }, [height]);

  useEffect(() => {
    setIsLoading(false);
  }, [productId]);


  const onAddToCart = () => {
    dispatch(addItem({ ...productSelected, quantity: quantityState }))
    dispatch(reset())
  };

  const onPress = () => {
    onAddToCart();
    handleSubmit();
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView>
            <Container position="top"/>
            <Image
              source={{ uri: productSelected.images[0] }}
              resizeMode="cover"
              style={
                isPortrait ? styles.imageProduct : styles.imageProductLandscape
              }
            />
            {/* <Carousel /> */}
            <View style={styles.detailContainer}>
              <Text style={styles.title}>{productSelected.title}</Text>
              <Text style={styles.description}>
                {productSelected.description}
              </Text>
              <Text style={styles.price}>$ {productSelected.price}</Text>
              <TouchableOpacity
                style={isPortrait ? styles.buyButton : styles.buyAlt}
                onPress={onPress}
              >
                <Text style={styles.buttonText}>Agregar al carrito</Text>
              </TouchableOpacity>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={counterDecrement}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.buyText}> {quantityState} </Text>
                <TouchableOpacity
                  onPress={counterIncrement}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  imageProduct: {
    minWidth: 300,
    width: "100%",
    height: 400,
  },
  imageProductLandscape: {
    width: 200,
    height: 200,
  },
  detailContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Karla-Bold",
    fontSize: 32,
  },
  description: {
    fontFamily: "Karla-regular",
    fontSize: 20,
  },
  price: {
    fontFamily: "Karla-Bold",
    fontSize: 32,
    color: colors.secondary,
  },
  buyButton: {
    marginTop: 10,
    width: 200,
    padding: 10,
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 10,
  },
  buyText: {
    color: colors.secondary,
    fontSize: 20,
  },
  buyAlt: {
    marginTop: 10,
    width: 200,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
