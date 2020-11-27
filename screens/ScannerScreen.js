import * as WebBrowser from "expo-web-browser";

import React from "react";
import Scanner from "../components/Scanner";

export default function ScannerScreen(props) {
  return (
    <Scanner
      meal={props.navigation.getParam("meal")}
      navigation={props.navigation}
    />
  );
}

ScannerScreen.navigationOptions = {
  header: false
};
