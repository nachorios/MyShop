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
  viewText: {
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
  formContainerRegister: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  inputFormRegister: { marginTop: 5 },
  btnContainerRegister: {
    marginTop: 15,
    marginLeft: 10,
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
  itemView: {
    flexDirection: "row",
  },
  nameView: {
    flex: 1,
    fontSize: 20,
  },
  name: { fontSize: 20 },
  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
  total: {
    fontWeight: "bold",
    fontSize: 20,
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  btnContainerCart: {
    margin: 20,
  },
  btnCart: {
    borderRadius: 10,
  },
  btnContainerCartBuy: {
    margin: 20,
  },
  btnCartBuy: {
    backgroundColor: "#00a680",
    borderRadius: 10,
  },
  loader: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  btnCloseSessionText: {
    color: "#00a680",
  },
  viewConfirm: {
    marginTop: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: { fontSize: 10 },
  btnCartDelete: {
    borderRadius: 10,
  },
  itemViewButton: {
    flexDirection: "row",
    marginLeft: -8,
  },
});
