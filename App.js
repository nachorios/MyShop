import React from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterForm from "./app/screens/RegisterForm";
import ShoppingCart from "./app/screens/ShoppingCart";
import Item from "./app/screens/Item";
import Pay from "./app/screens/Pay";
import Home from "./app/screens/Home";
import ItemCart from "./app/screens/ItemCart";
import ConfirmPay from "./app/screens/ConfirmPay";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterForm"
          component={RegisterForm}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: false,
            title: "My Shop",
          }}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          options={{
            title: "Carrito",
          }}
        />
        <Stack.Screen
          name="Item"
          component={Item}
          options={{
            title: "Informacion del articulo",
          }}
        />
        <Stack.Screen
          name="Pay"
          component={Pay}
          options={{
            title: "Pagar compra",
          }}
        />
        <Stack.Screen
          name="ItemCart"
          component={ItemCart}
          options={{
            title: "Item Compra",
          }}
        />
        <Stack.Screen
          name="ConfirmPay"
          component={ConfirmPay}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
