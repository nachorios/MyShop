import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
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
  const { route } = props;
  const { navigate, setRegis } = route.params;
  const [showPass, setShowPass] = useState(false);
  const [showPassRep, setShowPassRep] = useState(false);
  const [formData, setformData] = useState(defaultFormValue());
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.pass) ||
      isEmpty(formData.passRep) ||
      isEmpty(formData.city) ||
      isEmpty(formData.adress) ||
      isEmpty(formData.name) ||
      isEmpty(formData.lastName)
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
          db.collection("users").doc(firebase.auth().currentUser.uid).set({
            name: formData.name,
            lastName: formData.lastName,
            adress: formData.adress,
            city: formData.city,
          });
          setLoading(false);
          setRegis(true);
          navigate.navigate("WelcomeScreen");
        });
    }
  };

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <ScrollView style={styles.formContainerRegister}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.inputFormRegister}
        onChange={(e) => onChange(e, "name")}
        rightIcon={
          <Icon
            type="material-community"
            name="alpha-n-box-outline"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Apellido"
        containerStyle={styles.inputFormRegister}
        onChange={(e) => onChange(e, "lastName")}
        rightIcon={
          <Icon
            type="material-community"
            name="alpha-a-box-outline"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Direccion"
        containerStyle={styles.inputFormRegister}
        onChange={(e) => onChange(e, "adress")}
        rightIcon={
          <Icon
            type="material-community"
            name="home-account"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Ciudad"
        containerStyle={styles.inputFormRegister}
        onChange={(e) => onChange(e, "city")}
        rightIcon={
          <Icon
            type="material-community"
            name="city"
            iconStyle={styles.iconRight}
          />
        }
      />

      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputFormRegister}
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
        containerStyle={styles.inputFormRegister}
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
        containerStyle={styles.inputFormRegister}
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
    </ScrollView>
  );
}

function defaultFormValue() {
  return {
    email: "",
    pass: "",
    passRep: "",
    name: "",
    lastName: "",
    adress: "",
    city: "",
  };
}
