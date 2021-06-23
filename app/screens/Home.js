import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon, Button, ListItem } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "../styles/styles";
import { size } from "lodash";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Home() {
  const navigate = useNavigation();

  const [stocks, setStock] = useState(null);
  const [product, setProduct] = useState([]);

  useFocusEffect(
    useCallback(() => {
      db.collection("products")
        .orderBy("name", "asc")
        .get()
        .then((response) => {
          const arrayStock = [];
          response.forEach((doc) => {
            const stock = doc.data();
            stock.id = doc.id;
            arrayStock.push(stock);
          });

          setStock(arrayStock);
        });
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {size(stocks) > 0 ? (
        <FlatList
          data={stocks}
          renderItem={(stock) => (
            <StockList stock={stock} navigation={navigate} product={product} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loader}>
          <Text>Cargando datos</Text>
          <ActivityIndicator size="large" color="#00a680" />
        </View>
      )}

      <Icon
        reverse
        type="material-community"
        name="cart"
        color="#00a680"
        containerStyle={styles.btnContainer}
        onPress={() => navigate.navigate("ShoppingCart", { product, navigate })}
      />
    </View>
  );
}
function StockList(props) {
  const { stock, navigation, product } = props;
  const { name, description, price, id } = stock.item;
  const goStock = () => {
    navigation.navigate("Item", {
      name,
      description,
      price,
      id,
      product,
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
            <Text style={styles.price}>${price}</Text>
          </View>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}
