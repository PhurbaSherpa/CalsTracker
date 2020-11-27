import * as WebBrowser from "expo-web-browser";

import React from "react";
import SignUp from "../components/Signup";

export default function SignupScreen(props) {
  return <SignUp navigation={props.navigation} />;
}

SignupScreen.navigationOptions = {
  header: false
};
