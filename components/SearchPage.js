import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { getResults } from "../store/results";
import Results from "./Results";

class SearchPage extends Component {
  constructor(props) {
    super();
    this.state = { value: "" };
    this.emptySearchBar = this.emptySearchBar.bind(this);
  }
  emptySearchBar() {
    this.setState({ value: "" });
  }
  render() {
    console.log(this.state.value);
    return (
      <View style={styles.container}>
        <View style={styles.headerConatiner}>
          <View style={styles.buttons}>
            <Button
              onPress={() => {
                this.emptySearchBar();
                this.props.navigation.navigate("Home");
              }}
              color="black"
              title="Home"
            />
            <Text style={styles.header}>Find Foods</Text>
            <Button
              onPress={() => {
                // await this.emptySearchBar();
                this.props.navigation.navigate("Scanner", {
                  meal: this.props.meal
                });
              }}
              color="black"
              title="Scan"
            />
          </View>
        </View>
        <View style={styles.searchBarOuter}>
          <View style={styles.inputBox}>
            <TextInput
              value={this.state.value}
              placeholder="Search"
              placeholderTextColor={"black"}
              style={styles.searchbar}
              clearButtonMode="always"
              onChangeText={value => {
                this.props.getResults(value);
                this.setState({ value });
              }}
            />
          </View>
        </View>
        <Results
          navigation={this.props.navigation}
          emptySearchBar={this.emptySearchBar}
          meal={this.props.meal}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getResults: query => dispatch(getResults(query))
});

export default connect(null, mapDispatchToProps)(SearchPage);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerConatiner: {
    backgroundColor: "rgb(0, 153, 204)",
    width: "100%",
    height: "13%"
  },
  buttons: {
    top: "13%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  header: {
    fontSize: 25
  },
  searchBarOuter: {
    width: "100%",
    height: "7%",
    backgroundColor: "rgb(235,235,235)",
    alignItems: "center"
  },
  inputBox: {
    borderRadius: 50,
    borderWidth: 0.5,
    height: "70%",
    width: "85%",
    top: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  searchbar: {
    width: "80%"
  }
});
