import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "../components/Home";

export default function HomeScreen(props) {
  return <Home navigation={props.navigation} />;
}

HomeScreen.navigationOptions = {
  header: null
};
