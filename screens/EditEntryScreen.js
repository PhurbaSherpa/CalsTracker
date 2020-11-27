import * as WebBrowser from "expo-web-browser";

import React from "react";
import EditEntry from "../components/EditEntry";

export default function SingleFoodScreen(props) {
  return (
    <EditEntry
      meal={props.navigation.getParam("meal")}
      foodId={props.navigation.getParam("foodId")}
      date={props.navigation.getParam("date")}
      navigation={props.navigation}
    />
  );
}

SingleFoodScreen.navigationOptions = {
  header: false
};
