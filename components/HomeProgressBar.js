import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getDetails } from "../store/userDetails";

class HomeProgressBar extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.getDetails(this.props.userId);
  }
  render() {
    let calsLeft = Math.max(0, this.props.dailyCalories - this.props.allCals);
    let carbsLeft = Math.max(0, this.props.dailyCarbs - this.props.allCarbs);
    let proteinLeft = Math.max(
      0,
      this.props.dailyProtein - this.props.allProtein
    );
    let fatsLeft = Math.max(0, this.props.dailyFats - this.props.allFats);
    let calsPercent = Math.min(
      100,
      Math.floor((this.props.allCals / this.props.dailyCalories) * 100)
    );
    let carbsPercent = Math.min(
      100,
      Math.floor((this.props.allCarbs / this.props.dailyCarbs) * 100)
    );
    let fatsPercent = Math.min(
      100,
      Math.floor((this.props.allFats / this.props.dailyFats) * 100)
    );
    let proteinPercent = Math.min(
      100,
      Math.floor((this.props.allProtein / this.props.dailyProtein) * 100)
    );
    return (
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.calories}>
            <View style={styles.infoBox}>
              <Text style={styles.small}>{this.props.allCals}</Text>
              <Text>EATEN</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={styles.left}>
                <Text style={styles.large}>{calsLeft}</Text>
                <Text>KCAL LEFT</Text>
              </View>
              <View style={styles.progressLayer}>
                <View
                  style={{ ...styles.progressLayer2, width: `${calsPercent}%` }}
                ></View>
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.small}>0</Text>
              <Text>BURNED</Text>
            </View>
          </View>
          <View style={styles.macros}>
            <View style={styles.macro}>
              <Text>FAT</Text>
              <View style={styles.fatBar}>
                <View
                  style={{ ...styles.fat2, width: `${fatsPercent}%` }}
                ></View>
              </View>
              <Text style={styles.centered}>
                {fatsLeft}/{this.props.dailyFats}g left
              </Text>
            </View>
            <View style={styles.macro}>
              <Text>PROTEIN</Text>
              <View style={styles.proteinBar}>
                <View
                  style={{ ...styles.protein2, width: `${proteinPercent}%` }}
                ></View>
              </View>
              <Text style={styles.centered}>
                {proteinLeft}/{this.props.dailyProtein}g left
              </Text>
            </View>
            <View style={styles.macro}>
              <Text>CARBS</Text>
              <View style={styles.carbsBar}>
                <View
                  style={{ ...styles.carbs2, width: `${carbsPercent}%` }}
                ></View>
              </View>
              <Text style={styles.centered}>
                {carbsLeft}/{this.props.dailyCarbs}g left
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={{ marginTop: 20 }}>DETAILS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dailyCalories: state.details.calories,
  dailyProtein: state.details.protein,
  dailyCarbs: state.details.carbs,
  dailyFats: state.details.fats,
  allCals: state.meals.total,
  allProtein: state.meals.protein,
  allCarbs: state.meals.carbs,
  allFats: state.meals.fats
});
const mapDispatchToState = dispatch => ({
  getDetails: () => dispatch(getDetails())
});

export default connect(mapStateToProps, mapDispatchToState)(HomeProgressBar);

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "rgb(230, 230, 230)",
    height: "40%"
  },
  info: {
    backgroundColor: "rgb(0, 153, 204)",
    height: "100%",
    alignItems: "center"
  },
  calories: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "50%",
    marginTop: 50,
    marginLeft: 15
  },
  infoBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  small: {
    fontSize: 24
  },
  large: {
    fontSize: 44
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  progressLayer: {
    width: 100,
    backgroundColor: "rgba(255, 255, 255,.2)",
    height: 10
  },
  progressLayer2: {
    backgroundColor: "white",
    height: 10
  },
  macros: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  macro: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 60
  },
  fatBar: {
    width: 100,
    backgroundColor: "rgba(255, 255, 255,.2)",
    height: 10
  },
  fat2: {
    backgroundColor: "white",
    height: 10
  },
  proteinBar: {
    width: 100,
    backgroundColor: "rgba(255, 255, 255,.2)",
    height: 10
  },
  protein2: {
    backgroundColor: "white",
    height: 10
  },
  carbsBar: {
    width: 100,
    backgroundColor: "rgba(255, 255, 255,.2)",
    height: 10
  },
  carbs2: {
    backgroundColor: "white",
    height: 10
  }
});
