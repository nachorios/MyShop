import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "../styles/styles";
import { Input, Icon, Button } from "react-native-elements";

export default function ItemCart(props) {
  const { products, product, setShowModal, setNewCant, setNewTotal } = props;
  const { name, description, price, id, total, cant } = products.item;
  const [c, setC] = useState(0);

  const modify = () => {
    setNewTotal(c * price);
    setNewCant(c);
    setShowModal(false);
  };

  const deleteItem = () => {
    let index = 0;
    for (let i = 0; i < product.length; i++) {
      if (id == product[i].id) {
        index = product.indexOf(product[i]);
        product.splice(index, 1);
      }
    }
    setShowModal(false);
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
      <Button
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={deleteItem}
        title="Eliminar item"
      />
    </View>
  );
}
