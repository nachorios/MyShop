import React, { useState, useRef } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import { Input, Icon, Button } from "react-native-elements";
import styles from "../styles/styles";

export default function Item(props) {
  const { route } = props;
  const { name, description, price, id, product, navigation } = route.params;
  const toastRef = useRef();
  const [cant, setCant] = useState(0);

  const add = () => {
    let flag = true;
    for (let i = 0; i < product.length; i++) {
      if (id == product[i].id) {
        flag = false;
      }
    }
    if (flag) {
      const total = parseFloat(cant) * parseFloat(price);
      product.push({
        name: name,
        description: description,
        price: price,
        total: parseFloat(total).toFixed(2),
        id: id,
        cant: cant,
      });
      navigation.navigate("Home");
    } else {
      toastRef.current.show(
        "El producto ya esta agregado al carrito de compras!"
      );
    }
  };
  return (
    <View>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
      <Input
        placeholder="Cantidad"
        containerStyle={styles.inputForm}
        onChange={(e) => setCant(e.nativeEvent.text)}
      />
      <Button
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={add}
        title="Agregar al carrtio"
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
