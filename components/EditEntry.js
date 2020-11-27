import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { getSingleItem } from "../store/singleFood";
import { deleteItem } from "../store/meals";
import { editItem } from "../store/meals";

class EditEntry extends Component {
  constructor(props) {
    super();
    this.state = { servings: 0 };
  }
  async componentDidMount() {
    await this.props.getItem(
      this.props.foodId,
      this.props.meal,
      this.props.date
    );
    this.setState({ servings: this.props.singleFood.servings });
  }
  render() {
    const {
      mealType,
      foodId,
      date,
      foodName,
      calories,
      carbs,
      fats,
      protein,
      cholesterol,
      fiber,
      potassium,
      sodium,
      sugar,
      brand,
      servings,
      servingSize
    } = this.props.singleFood;
    let proteinPercent = Math.floor(((protein * 4) / calories) * 100);
    let carbsPercent = Math.floor(((carbs * 4) / calories) * 100);
    let fatPercent = Math.floor(((fats * 9) / calories) * 100);

    return this.props.singleFood.foodName ? (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Text>Back</Text>
            </TouchableOpacity>

            <Text>Edit Entry</Text>
            <TouchableOpacity
              onPress={async () => {
                await this.props.editItem(
                  foodId,
                  mealType,
                  date,
                  this.state.servings
                );

                this.props.navigation.navigate("Home");
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.foodInfo}>
          <View style={styles.type}>
            <Text>Meal</Text>
            <Text>{mealType}</Text>
          </View>
        </View>
        <View style={styles.food}>
          <Text style={styles.foodname}>{foodName}</Text>
          <Text style={styles.brand}>{brand}</Text>
        </View>
        <View style={styles.macros}>
          <View style={styles.cals}>
            <Text style={{ fontSize: 24 }}>
              {calories * this.state.servings}
            </Text>
            <Text>cal</Text>
            <View style={styles.bar}>
              <View
                style={{ ...styles.carbs, width: `${carbsPercent}%` }}
              ></View>
              <View style={{ ...styles.fat, width: `${fatPercent}%` }}></View>
              <View
                style={{ ...styles.protein, width: `${proteinPercent}%` }}
              ></View>
            </View>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "rgb(103, 223, 230)" }}>{carbsPercent}%</Text>
            <Text>{carbs * this.state.servings}</Text>
            <Text>Carbs</Text>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "red" }}>{fatPercent}%</Text>
            <Text>{fats * this.state.servings}g</Text>
            <Text>Fat</Text>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "purple" }}>{proteinPercent}%</Text>
            <Text>{protein * this.state.servings}g</Text>
            <Text>Protein</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.servingContainer}>
          <View style={styles.serving}>
            <Text>Serving Size</Text>
            <Text>{servingSize} grams</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.servingContainer}>
          <View style={styles.serving}>
            <Text>Number of Servings</Text>
            {/* should be an input */}
            <TextInput
              style={{
                width: 100,
                height: 20,
                textAlign: "right"
              }}
              placeholder={`${servings}`}
              placeholderTextColor="black"
              keyboardType="numeric"
              onChangeText={text => this.setState({ servings: text })}
            />
          </View>
        </View>
        <View style={styles.nutrition}>
          <View style={styles.nutriHead}>
            <Text>Nutrition Facts</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Calories</Text>
            <Text>{calories * this.state.servings}</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Total Fat</Text>
            <Text>{fats * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Total Carbohydrates</Text>
            <Text>{carbs * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Protein</Text>
            <Text>{protein * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Cholesterol</Text>
            <Text>{cholesterol * this.state.servings} mg</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Sodium</Text>
            <Text>{sodium * this.state.servings} mg</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Dietary Fiber</Text>
            <Text>{fiber * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Sugar</Text>
            <Text>{sugar * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Potassium</Text>
            <Text>{potassium * this.state.servings} mg</Text>
          </View>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              this.props.deleteItem(foodId, date, mealType);
              this.props.navigation.navigate("Home");
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              DELETE ENTRY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Text>Back</Text>
            </TouchableOpacity>

            <Text>Edit Entry</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.foodInfo}>
          <View style={styles.type}>
            <Text>Meal</Text>
            <Text>-------</Text>
          </View>
        </View>
        <View style={styles.food}>
          <Text style={styles.foodname}>Can't find in Database</Text>
          <Text style={styles.brand}>--------</Text>
        </View>
        <View style={styles.macros}>
          <View style={styles.cals}>
            <Text style={{ fontSize: 24 }}>0</Text>
            <Text>cal</Text>
            <View style={styles.bar}>
              <View style={styles.carbs}></View>
              <View style={styles.fat}></View>
              <View style={styles.protein}></View>
            </View>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "rgb(103, 223, 230)" }}>0%</Text>
            <Text>0</Text>
            <Text>Carbs</Text>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "red" }}>0%</Text>
            <Text>0g</Text>
            <Text>Fat</Text>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "purple" }}>0%</Text>
            <Text>0g</Text>
            <Text>Protein</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.servingContainer}>
          <View style={styles.serving}>
            <Text>Serving Size</Text>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.servingContainer}>
          <View style={styles.serving}>
            <Text>Number of Servings</Text>
            <Text>0</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.nutrition}>
          <View style={styles.nutriHead}>
            <Text>Nutrition Facts</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  singleFood: state.singleFood
});

const mapDispatchToProps = dispatch => ({
  getItem: (foodId, meal, date) => {
    return dispatch(getSingleItem(foodId, meal, date));
  },
  editItem: (foodId, meal, date, servings) => {
    return dispatch(editItem(foodId, meal, date, servings));
  },
  deleteItem: (foodId, meal, date) => {
    return dispatch(deleteItem(foodId, meal, date));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "rgb(250, 250, 250)",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey"
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "95%"
  },
  foodInfo: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(230,230,230)"
  },
  type: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%"
  },
  food: {
    justifyContent: "space-evenly",
    borderBottomWidth: 0.5,
    height: 90,
    borderBottomColor: "rgb(230,230,230)",
    alignItems: "center"
  },
  foodname: {
    fontSize: 16,
    fontWeight: "400",
    width: "95%"
  },
  brand: {
    fontWeight: "200",
    fontSize: 12,
    width: "95%"
  },
  macros: {
    flexDirection: "row",
    alignItems: "center",
    height: 200
  },
  bar: {
    height: 10,
    width: 80,
    flexDirection: "row"
  },
  carbs: {
    height: 10,
    backgroundColor: "rgb(103, 223, 230)"
  },
  fat: {
    height: 10,
    backgroundColor: "red"
  },
  protein: {
    height: 10,
    backgroundColor: "purple"
  },
  cals: {
    width: "25%",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 70
  },
  macro: {
    width: "25%",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 70
  },
  servingContainer: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(230,230,230)",
    height: 50,
    justifyContent: "center"
  },
  serving: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  nutrition: {
    height: 700
  },
  nutriHead: {
    backgroundColor: "rgb(230,230,230)",
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  nutri: {
    height: "8%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    marginLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(230,230,230)"
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
    height: "10%"
  }
});
