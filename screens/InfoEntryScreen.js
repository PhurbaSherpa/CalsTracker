import * as WebBrowser from "expo-web-browser";
import React from "react";
import Info from "../components/Info";

export default function InfoEntryScreen(props) {
  return <Info navigation={props.navigation} />;
}

InfoEntryScreen.navigationOptions = {
  header: null
};
