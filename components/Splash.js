import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class Splash extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Login");
    }, 1500);
  }
  render() {
    return (
      <View style={styles.splashContainer}>
        <Image
          style={styles.plate}
          source={require("../assets/images/plate.png")}
        ></Image>
        <Text style={styles.title}>YUM</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plate: {
    width: "50%",
    height: "25%"
  },
  splashContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    color: "black",
    fontSize: 48,
    textAlign: "center",
    letterSpacing: 5,
    fontWeight: "bold"
  }
});
