import React, { useRef, useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, ListItem, Input } from "react-native-elements";
import styles from "../styles/styles";
import Modal from "../utils/Modal";

export default function ShoppingCart(props) {
  const { route } = props;
  const { product, navigate } = route.params;
  const toastRef = useRef();

  let totalAmount = 0;

  for (let i = 0; i < product.length; i++) {
    totalAmount = parseFloat(totalAmount) + parseFloat(product[i].total);
  }
  const toEmpty = () => {
    product.length = 0;
    navigate.navigate("Home");
  };

  const goToPay = () => {
    if (totalAmount > 0) {
      navigate.navigate("Pay", { totalAmount, navigate, product });
    } else {
      toastRef.current.show("El carrito esta vacio!");
    }
  };

  return (
    <View>
      <FlatList
        data={product}
        renderItem={(products) => (
          <StockList
            navigation={navigate}
            products={products}
            product={product}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <ListItem bottomDivider>
        <ListItem.Content>
          <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.total}>Total</Text>
            </View>
            <Text style={styles.price}>${totalAmount}</Text>
          </View>
        </ListItem.Content>
      </ListItem>
      <Button
        containerStyle={styles.btnContainerCartBuy}
        buttonStyle={styles.btnCartBuy}
        onPress={goToPay}
        title="Comprar"
      />
      <Button
        containerStyle={styles.btnContainerCart}
        buttonStyle={styles.btnCart}
        onPress={toEmpty}
        title="Vaciar carrito"
        type="outline"
      />
      <Toast
        ref={toastRef}
        style={{ backgroundColor: "red" }}
        position="top"
        opacity={0.9}
      />
    </View>
  );
}

function StockList(props) {
  const { navigation, products, product } = props;
  const { name, price, id, total, cant } = products.item;
  const [newCant, setNewCant] = useState(cant);
  const [newTotal, setNewTotal] = useState(total);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const modifyc = () => {
    setRenderComponent(
      <ModifyForm
        navigation={navigation}
        setShowModal={setShowModal}
        products={products}
        setNewCant={setNewCant}
        setNewTotal={setNewTotal}
        product={product}
      />
    );
    setShowModal(true);
  };

  const deleteItem = () => {
    let index = 0;
    for (let i = 0; i < product.length; i++) {
      if (id == product[i].id) {
        index = product.indexOf(product[i]);
        product.splice(index, 1);
      }
    }
    navigation.navigate("Home");
  };

  return (
    <View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.name}>{name} </Text>
            </View>
            <Text style={styles.price}>${newTotal}</Text>
          </View>

          <ListItem.Subtitle>
            Precio Unitario: ${price} Cantidad: {newCant}
          </ListItem.Subtitle>
          <View style={styles.itemViewButton}>
            <Button
              title="Eliminar"
              type="clear"
              titleStyle={styles.titleStyle}
              onPress={deleteItem}
            />
            <Button
              title="Modificar"
              type="clear"
              titleStyle={styles.titleStyle}
              onPress={modifyc}
            />
          </View>
        </ListItem.Content>
      </ListItem>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

function ModifyForm(props) {
  const { products, product, setShowModal, navigation } = props;
  const { name, description, price, id } = products.item;
  const [c, setC] = useState(0);
  const modify = () => {
    let index = 0;
    for (let i = 0; i < product.length; i++) {
      if (id == product[i].id) {
        index = product.indexOf(product[i]);
        product.splice(index, 1);
      }
    }

    const total = parseFloat(c) * parseFloat(price);
    product.push({
      name: name,
      description: description,
      price: price,
      total: parseFloat(total).toFixed(2),
      id: id,
      cant: c,
    });
    setShowModal(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Cantidad"
        containerStyle={styles.inputForm}
        onChange={(e) => setC(e.nativeEvent.text)}
      />
      <Button
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={modify}
        title="Modificar item"
      />
    </View>
  );
}
