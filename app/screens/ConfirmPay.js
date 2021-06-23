import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../styles/styles";

export default function ConfirmPay(props) {
  const { route } = props;
  const { navigate } = route.params;
  const goHome = () => {
    navigate.navigate("Home");
  };
  return (
    <View style={styles.viewConfirm}>
      <Text style={styles.name}>Felicitaciones!</Text>
      <Text style={styles.name}>Pago confirmado</Text>
      <Button
        containerStyle={styles.btnContainerCartBuy}
        buttonStyle={styles.btnCartBuy}
        onPress={goHome}
        title="Volver a comprar"
      />
    </View>
  );
}
