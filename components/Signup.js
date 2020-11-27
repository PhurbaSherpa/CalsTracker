import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { signUp } from "../store/user";

class SignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      email: null,
      password: null,
      firstName: null,
      lastName: null
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/food.jpg")}
          style={styles.bg}
        ></Image>
        <View style={styles.authBox}>
          <Text style={styles.title}>{`Cals\nTracker`}</Text>
          <View style={styles.inputs}>
            <View style={styles.name}>
              <View style={styles.nameInner}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="rgb(0,0,0)"
                  onChangeText={text => this.setState({ firstName: text })}
                />
              </View>
              <View style={styles.nameInner}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="rgb(0,0,0)"
                  onChangeText={text => this.setState({ lastName: text })}
                />
              </View>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="rgb(0,0,0)"
                onChangeText={text => this.setState({ email: text })}
                keyboardType="email-address"
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ password: text })}
                placeholder="Password"
                placeholderTextColor="rgb(0,0,0)"
                secureTextEntry={true}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={async () => {
              await this.props.signUp(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName
              );
              if (this.props.isSignedUp) {
                this.props.navigation.navigate("Info");
              }
            }}
            style={styles.button}
          >
            <View>
              <Text style={styles.whiteText}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={styles.newText}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isSignedUp: !!state.user.email
});
const mapDispatchToProps = dispatch => ({
  signUp: (email, password, firstName, lastName) =>
    dispatch(signUp(email, password, firstName, lastName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute"
  },
  authBox: {
    backgroundColor: "rgba(12,12,12,.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "80%",
    height: "70%"
  },
  title: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
    letterSpacing: 5,
    fontWeight: "bold"
  },
  name: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nameInner: {
    width: "46%"
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    height: "20%"
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    height: "60%",
    fontSize: 16
  },
  button: {
    width: "40%",
    height: "8%",
    backgroundColor: "rgba(25,78,63,.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  whiteText: {
    color: "white"
  },
  newText: {
    bottom: 60,
    color: "#FF7260",
    textAlign: "center"
  }
});
