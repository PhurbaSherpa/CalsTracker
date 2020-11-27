import * as WebBrowser from "expo-web-browser";
import React from "react";
import EditUser from "../components/EditUser";

export default function EditInfoScreen(props) {
  return <EditUser navigation={props.navigation} />;
}

EditInfoScreen.navigationOptions = {
  header: null
};
