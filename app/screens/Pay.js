import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import styles from "../styles/styles";
import Loading from "../utils/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Pay(props) {
  const { route } = props;
  const { totalAmount, navigate, product } = route.params;
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          setUser(response.data());
        });
    }, [])
  );

  const payConfirm = () => {
    setLoading(true);

    db.collection("pay")
      .get()
      .then((response) => {
        product.length = 0;
        setLoading(false);
        navigate.navigate("ConfirmPay", { navigate });
      });
  };

  return (
    <View>
      {user ? (
        <View>
          <Text>
            Comprador: {user.name} {user.lastName}
          </Text>
          <Text>Direccion de envio: {user.adress}</Text>
          <Text>Ciudad: {user.city}</Text>
          <Text>Total a pagar: {totalAmount}</Text>
          <Text>Ingresar datos de la tarjeta</Text>

          <Button
            containerStyle={styles.btnContainerCartBuy}
            buttonStyle={styles.btnCartBuy}
            onPress={payConfirm}
            title="Comprar"
          />
        </View>
      ) : (
        <View style={styles.loader}>
          <Text>Cargando datos</Text>
          <ActivityIndicator size="large" color="#00a680" />
        </View>
      )}
      <Loading isVisible={loading} text="Confirmando pago" />
    </View>
  );
}
