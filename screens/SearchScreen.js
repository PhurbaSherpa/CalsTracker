import * as WebBrowser from "expo-web-browser";

import React from "react";
import SearchPage from "../components/SearchPage";

export default function SearchScreen(props) {
  return (
    <SearchPage
      meal={props.navigation.getParam("meal")}
      navigation={props.navigation}
    />
  );
}

SearchScreen.navigationOptions = {
  header: false
};
