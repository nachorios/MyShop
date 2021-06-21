import React, { useState, useRef } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../utils/Loading";
import { validateEmail } from "../utils/validations";
import { size, isEmpty } from "lodash";
import Toast from "react-native-easy-toast";
import styles from "../styles/styles";
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function RegisterForm(props) {
  const { setShowModal, setRegis } = props;
  const [showPass, setShowPass] = useState(false);
  const [showPassRep, setShowPassRep] = useState(false);
  const [formData, setformData] = useState(defaultFormValue());
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.pass) ||
      isEmpty(formData.passRep)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else if (formData.pass !== formData.passRep) {
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    } else if (size(formData.pass) < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener al menos 6 caracteres"
      );
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.pass)
        .then(() => {
          setLoading(false);

          setShowModal(false);
          setRegis(true);
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("El email ya esta en uso, pruebe con otro");
        });
    }
  };

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onCheck = () => {
    return (
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        windowBackgroundColor="rgba(0,0,0,0.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}
      >
        <Text>Cuenta Registrada</Text>
      </Overlay>
    );
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPass ? false : true}
        onChange={(e) => onChange(e, "pass")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPass(!showPass)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassRep ? false : true}
        onChange={(e) => onChange(e, "passRep")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassRep ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassRep(!showPassRep)}
          />
        }
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
      <Toast
        ref={toastRef}
        style={{ backgroundColor: "red" }}
        position="top"
        opacity={0.9}
      />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    pass: "",
    passRep: "",
  };
}
