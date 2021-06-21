import { StyleSheet } from "react-native";

export default StyleSheet.create({
  viewWelcome: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewButton: {
    marginTop: "80%",
    justifyContent: "center",
  },
  viewImage: {
    marginTop: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 400,
    height: 900,
  },
  icon: {
    width: 100,
    height: 200,
  },
  btn: {
    backgroundColor: "#00a680",
    margin: 20,
    borderRadius: 10,
  },
  formContainer: {
    justifyContent: "center",

    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
    borderRadius: 10,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
    borderRadius: 10,
  },
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  loading: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 10,
  },
  viewLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textLoading: {
    color: "#00a680",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
