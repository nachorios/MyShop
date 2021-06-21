import React from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreAllLogs();

export default function App() {
  return <WelcomeScreen />;
}
