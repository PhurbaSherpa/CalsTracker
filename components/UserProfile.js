import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/user";

function UserProfile(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerbox}>
        <Text style={styles.headerText}>Personal Details</Text>
        <View style={styles.editbutton}>
          <Button
            onPress={() => {
              props.navigation.navigate("EditInfo");
            }}
            color="black"
            title="Edit Info"
          />
        </View>
      </View>
      <View style={styles.detailsBox}>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Name</Text>
            <Text style={styles.detail}>
              {props.firstName + " " + props.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Height</Text>
            <Text style={styles.detail}>
              {props.feet + " ft, " + props.inches + " in"}
            </Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Gender</Text>
            <Text style={styles.detail}>{props.gender}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Age</Text>
            <Text style={styles.detail}>{props.age}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Weight</Text>
            <Text style={styles.detail}>{props.weight}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Email Address</Text>
            <Text style={styles.detail}>{props.email}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Recommended Calories</Text>
            <Text style={styles.detail}>{props.calories}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Recommended Protein</Text>
            <Text style={styles.detail}>{props.protein}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Recommended Fats</Text>
            <Text style={styles.detail}>{props.fats}</Text>
          </View>
        </View>
        <View style={styles.innerBox}>
          <View style={styles.detailsText}>
            <Text style={styles.detailName}>Recommended Carbohydrates</Text>
            <Text style={styles.detail}>{props.carbs}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={{ ...styles.buttonInner, backgroundColor: "rgb(0, 153, 204)" }}
        >
          <Button
            onPress={async () => {
              props.navigation.navigate("Recalculate");
            }}
            color="black"
            title="Recalculate Calories"
          />
        </View>
        <View style={styles.buttonInner}>
          <Button
            onPress={async () => {
              await props.logOut();
              props.navigation.navigate("Login");
            }}
            color="black"
            title="Logout"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgb(240, 240, 240)" },
  headerbox: {
    marginLeft: "5%",
    top: "18%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: { fontSize: 16 },
  editbutton: {
    backgroundColor: "rgb(0, 153, 204)",
    width: "40%",
    bottom: "2%"
  },
  detailsBox: {
    backgroundColor: "rgb(250, 247, 247)",
    alignItems: "center",
    top: "10%"
  },
  innerBox: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(240, 240, 240)",
    alignItems: "center",
    height: 50,
    justifyContent: "center"
  },
  detailsText: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonContainer: {
    width: "100%",
    top: "11%",
    alignItems: "center"
  },
  buttonInner: {
    backgroundColor: "red",
    width: "50%",
    height: "15%",
    marginBottom: "5%"
  }
});

const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email,
  age: state.details.age,
  feet: state.details.feet,
  inches: state.details.inches,
  weight: state.details.weight,
  calories: state.details.calories,
  protein: state.details.protein,
  fats: state.details.fats,
  carbs: state.details.carbs,
  gender: state.details.gender
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
