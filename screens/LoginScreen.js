import * as WebBrowser from "expo-web-browser";

import React from "react";
import Login from "../components/Login";

export default function LoginScreen(props) {
  return <Login navigation={props.navigation} />;
}

LoginScreen.navigationOptions = {
  header: null
};
