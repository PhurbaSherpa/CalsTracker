import * as WebBrowser from "expo-web-browser";

import React from "react";
import SingleFood from "../components/SingleFood";

export default function SingleFoodScreen(props) {
  return (
    <SingleFood
      meal={props.navigation.getParam("meal")}
      foodId={props.navigation.getParam("foodId")}
      navigation={props.navigation}
    />
  );
}

SingleFoodScreen.navigationOptions = {
  header: false
};
