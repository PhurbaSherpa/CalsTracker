import * as WebBrowser from "expo-web-browser";
import React from "react";
import Info from "../components/Info";

export default function RecalculateScreen(props) {
  return <Info navigation={props.navigation} editUser={true} />;
}

RecalculateScreen.navigationOptions = {
  header: null
};
