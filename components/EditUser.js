import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { changeUser } from "../store/user";

class EditUser extends Component {
  constructor(props) {
    super();
    this.state = { email: "", firstName: "", lastName: "" };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 30 }}>Edit Info</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            onChangeText={value => {
              this.setState({ email: value });
            }}
            fontSize={24}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            onChangeText={value => {
              this.setState({ firstName: value });
            }}
            fontSize={24}
            placeholder="First Name"
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            onChangeText={value => {
              this.setState({ lastName: value });
            }}
            fontSize={24}
            placeholder="Last Name"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Button
              onPress={async () => {
                await this.props.changeUser({
                  email: this.state.email,
                  firstName: this.state.firstName,
                  lastName: this.state.lastName
                });
                this.props.navigation.navigate("Profile");
              }}
              title="Done"
            />
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("Profile")}
              title="Cancel"
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeUser: item => dispatch(changeUser(item))
});

export default connect(null, mapDispatchToProps)(EditUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerContainer: {
    height: 200
  },
  inputs: {
    height: 70
  }
});
