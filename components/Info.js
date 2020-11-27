import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewUserDetails } from "../store/userDetails";
import { editUserDetails } from "../store/userDetails";

import {
  View,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  InputAccessoryView,
  Button,
  Keyboard,
  Slider
} from "react-native";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      gender: null,
      age: null,
      weight: null,
      feet: null,
      inches: null,
      activityType: null
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              width: 300,
              marginTop: "10%"
            }}
          >
            Calculate Recommended Calories
          </Text>
        </View>
        <Picker
          selectedValue={this.state.gender}
          onValueChange={itemValue => this.setState({ gender: itemValue })}
          style={{ height: 150, bottom: 20 }}
        >
          <Picker.Item label="SelectGender" value="select gender" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        {this.state.gender ? (
          <View style={styles.textinputs}>
            <View style={styles.agebox}>
              <Text style={{ fontSize: 24 }}>Age</Text>
              <TextInput
                style={styles.ageInput}
                placeholder="age"
                keyboardType="numeric"
                onChangeText={text => this.setState({ age: text })}
                inputAccessoryViewID="done button"
                clearButtonMode="always"
              />
            </View>
            <View style={styles.weightbox}>
              <Text style={{ fontSize: 24 }}>Weight(lbs)</Text>
              <TextInput
                style={styles.weightInput}
                placeholder="lbs"
                keyboardType="numeric"
                onChangeText={text => this.setState({ weight: text })}
                inputAccessoryViewID="done button"
                clearButtonMode="always"
              />
            </View>
          </View>
        ) : null}
        {this.state.age && this.state.weight ? (
          <View style={styles.heightbox}>
            <Picker
              selectedValue={this.state.feet}
              onValueChange={itemValue => this.setState({ feet: itemValue })}
              style={{ height: 100, width: 100 }}
            >
              <Picker.Item label="Feet" value="feet" />
              <Picker.Item label="0'" value="0" />
              <Picker.Item label="1'" value="1" />
              <Picker.Item label="2'" value="2" />
              <Picker.Item label="3'" value="3" />
              <Picker.Item label="4'" value="4" />
              <Picker.Item label="5'" value="5" />
              <Picker.Item label="6'" value="6" />
              <Picker.Item label="7'" value="7" />
              <Picker.Item label="8'" value="8" />
            </Picker>
            <Picker
              selectedValue={this.state.inches}
              onValueChange={itemValue => this.setState({ inches: itemValue })}
              mode="dropdown"
              style={{
                height: 100,
                width: 100
              }}
            >
              <Picker.Item label="Inches" value="inches" />
              <Picker.Item label='0"' value="0" />
              <Picker.Item label='1"' value="1" />
              <Picker.Item label='2"' value="2" />
              <Picker.Item label='3"' value="3" />
              <Picker.Item label='4"' value="4" />
              <Picker.Item label='5"' value="5" />
              <Picker.Item label='6"' value="6" />
              <Picker.Item label='7"' value="7" />
              <Picker.Item label='8"' value="8" />
              <Picker.Item label='9"' value="9" />
              <Picker.Item label='10"' value="10" />
              <Picker.Item label='11"' value="11" />
            </Picker>
          </View>
        ) : null}
        <InputAccessoryView nativeID="done button">
          <View style={{ alignItems: "flex-end" }}>
            <Button
              onPress={() => {
                Keyboard.dismiss();
              }}
              title="Done"
            />
          </View>
        </InputAccessoryView>
        {this.state.inches && this.state.feet ? (
          <View style={styles.activityBox}>
            <Slider
              style={styles.slider}
              maximumValue={5}
              minimumValue={1}
              value={3}
              step={1}
              onSlidingComplete={value => {
                this.setState({ activityType: value });
              }}
            />
            {this.state.activityType === 1 ? (
              <Text>Little or No Exercise</Text>
            ) : null}
            {this.state.activityType === 2 ? (
              <Text>Light Exercise 1-3 days a week</Text>
            ) : null}
            {this.state.activityType === 3 ? (
              <Text>Moderate Exercise 3-5 days a week</Text>
            ) : null}
            {this.state.activityType === 4 ? (
              <Text>Hard Exercise 6-7 days per week</Text>
            ) : null}
            {this.state.activityType === 5 ? (
              <Text>Very Hard Exercise sports/job/training</Text>
            ) : null}
            {!this.state.activityType ? (
              <Text>Moderate Exercise 3-5 days a week</Text>
            ) : null}
          </View>
        ) : null}
        {this.state.activityType ? (
          <View style={styles.calculate}>
            <Button
              onPress={async () => {
                if (this.props.isCalculated) {
                  await this.props.editUserDetails(
                    this.state.gender,
                    this.state.age,
                    this.state.weight,
                    this.state.feet,
                    this.state.inches,
                    this.state.activityType
                  );
                } else {
                  await this.props.addNewUserDetails(
                    this.state.gender,
                    this.state.age,
                    this.state.weight,
                    this.state.feet,
                    this.state.inches,
                    this.state.activityType
                  );
                }
                this.props.navigation.navigate("Profile");
              }}
              color="black"
              title="Calculate"
            />
          </View>
        ) : null}
        {!this.state.activityType && this.props.isCalculated ? (
          <View style={{ position: "absolute", top: "85%", left: "43%" }}>
            <Button
              onPress={() => this.props.navigation.navigate("Profile")}
              title="Back"
            />
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isCalculated: !!state.details.calories
});
const mapDispatchToProps = dispatch => ({
  addNewUserDetails: (gender, age, weight, feet, inches, activityType) =>
    dispatch(
      addNewUserDetails(gender, age, weight, feet, inches, activityType)
    ),

  editUserDetails: (gender, age, weight, feet, inches, activityType) =>
    dispatch(editUserDetails(gender, age, weight, feet, inches, activityType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    backgroundColor: "rgb(0, 153, 204)"
  },
  agebox: {
    alignItems: "center",
    width: "50%"
  },
  ageInput: {
    top: "2%",
    fontSize: 20,
    width: "50%",
    left: 33
  },
  weightbox: {
    alignItems: "center",
    width: "50%"
  },
  weightInput: {
    top: "2%",
    fontSize: 20,
    width: "50%",
    left: 33
  },
  heightbox: {
    flexDirection: "row",
    justifyContent: "center",
    top: "10%",
    height: 200
  },
  textinputs: {
    top: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  activityBox: {
    top: "10%",
    alignItems: "center"
  },
  slider: { width: "80%" },
  calculate: {
    top: "15%",
    left: "33%",
    backgroundColor: "rgb(0, 153, 204)",
    width: 150,
    height: 50
  }
});
