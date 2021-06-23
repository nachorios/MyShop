import React, { useRef } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import { Button, ListItem } from "react-native-elements";
import styles from "../styles/styles";

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
          <StockList navigation={navigate} products={products} />
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
        <ListItem.Chevron />
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
  const { navigation, products } = props;
  const { name, description, price, id, total, cant } = products.item;
  const goStock = () => {
    navigation.navigate("ItemCart", {
      name,
      description,
      price,
      id,
      navigation,
    });
  };
  return (
    <TouchableOpacity onPress={goStock}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <View style={styles.itemView}>
            <View style={styles.nameView}>
              <Text style={styles.name}>{name} </Text>
            </View>
            <Text style={styles.price}>${total}</Text>
          </View>
          <ListItem.Subtitle>
            Precio Unitario: ${price} Cantidad: {cant}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}
