import React from "react";
import { Overlay } from "react-native-elements"; // modales
import styles from "../styles/styles";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;
  //      para mostrar el moda/ cerrar el modal/ lo que el modal va a render
  const closeModal = () => setIsVisible(false);

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}
