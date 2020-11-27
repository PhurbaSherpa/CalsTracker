import * as WebBrowser from "expo-web-browser";

import React from "react";
import Splash from "../components/Splash";

export default function SplashScreen(props) {
  return <Splash navigation={props.navigation} />;
}

SplashScreen.navigationOptions = {};
