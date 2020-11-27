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
import { logIn } from "../store/user";

class Login extends Component {
  constructor(props) {
    super();
    this.state = { email: "", password: "" };
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
              await this.props.logIn(this.state.email, this.state.password);
              if (this.props.isLoggedIn) {
                this.props.navigation.navigate("Home");
              }
            }}
            style={styles.button}
          >
            <View>
              <Text style={styles.whiteText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
          <View>
            <View>
              <Text style={styles.whiteText}>Do not have account?</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <View>
                <Text style={styles.newText}>Create New Account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.email
});

const mapDispatchToProps = dispatch => ({
  logIn: (email, password) => dispatch(logIn(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    height: "60%"
  },
  title: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
    letterSpacing: 5,
    fontWeight: "bold"
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
    height: "70%",
    fontSize: 20
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
    color: "#FF7260",
    textAlign: "center"
  }
});
