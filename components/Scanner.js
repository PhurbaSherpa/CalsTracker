import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { connect } from "react-redux";
import { getSingleFood } from "../store/singleFood";

class Scanner extends Component {
  constructor(props) {
    super();
    this.state = { hasPermission: null, scanned: false };
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
  }
  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status });
  }

  async handleBarCodeScanned({ type, data }) {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    await this.props.gotSingleFood(data);
    this.props.navigation.navigate("SingleFood", {
      meal: this.props.meal,
      foodId: data
    });
  }

  render() {
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned ? undefined : this.handleBarCodeScanned
          }
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "red",
              backgroundColor: "transparent",
              height: 100,
              width: 200
            }}
          ></View>
        </BarCodeScanner>
        <View style={{ height: 100, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              backgroundColor: "white"
            }}
          >
            Hold your camera over a barcode to scan the item
          </Text>
          <Button
            title="Cancel"
            onPress={() =>
              this.props.navigation.navigate("Search", {
                meal: this.props.meal
              })
            }
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleFood: data => dispatch(getSingleFood(data))
});
export default connect(null, mapDispatchToProps)(Scanner);
