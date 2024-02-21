import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../services/shopService";
import { useEffect, useState } from "react";

const OrdersScreen = () => {
  const localId = useSelector((state) => state.authReducer.localId);
  const { data, isLoading, error } = useGetOrdersQuery(localId);
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [orderSelected, setOrderSelected] = useState({});
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      const orderData = Object.values(data);
      setOrderData(orderData);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const orderSelected = orderData.find((order) => order.orderId === orderId);
    setOrderSelected(orderSelected);
  }, [orderId]);

  const renderOrderItem = ({ item }) => {
    return <OrderItem order={item} setOrderId={setOrderId} setmodalVisible={setmodalVisible}/>;
  };

  return (
    <>
      <FlatList data={orderData} renderItem={renderOrderItem} />
      <Modal visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{orderSelected?.total}</Text>
              <Text style={styles.modalText}>lalala</Text>
              <Pressable
                style={[styles.button,styles.buttonClose]}
                onPress={()=> setmodalVisible(!modalVisible)}
              >
                  <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});