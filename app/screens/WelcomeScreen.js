import React, { useState, useRef } from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import { Button } from "react-native-elements";
import LoginForm from "./LoginForm";
import Modal from "../utils/Modal";
import styles from "../styles/styles";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const [renderComponent, setRenderComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [regis, setRegis] = useState(false);
  const toastRef = useRef();
  const navigate = useNavigation();

  const login = () => {
    setRenderComponent(
      <LoginForm navigate={navigate} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  const register = () => {
    navigate.navigate("RegisterForm", { navigate, setRegis });
  };

  if (regis == true) {
    setRenderComponent(<LoginForm />);
    setShowModal(true);
    setRegis(false);
  }

  return (
    <View style={styles.viewWelcome}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/fondo.png")}
      >
        <View style={styles.viewImage}>
          <Image style={styles.icon} source={require("../assets/icono.png")} />
        </View>
        <View style={styles.viewText}>
          <Text style={styles.name}>Compra lo que necesitas</Text>
        </View>

        <View style={styles.viewButton}>
          <Button
            onPress={login}
            title="Iniciar sesion"
            buttonStyle={styles.btn}
          />
          <Button
            onPress={register}
            title="Registrarse"
            buttonStyle={styles.btn}
          />
        </View>
      </ImageBackground>

      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {renderComponent}
      </Modal>
      <Toast
        ref={toastRef}
        style={{ backgroundColor: "red" }}
        position="top"
        opacity={0.9}
      />
    </View>
  );
}
