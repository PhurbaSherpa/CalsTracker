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
import { addItem } from "../store/meals";

class SingleFood extends Component {
  constructor(props) {
    super();
    this.state = { servings: 1 };
  }

  render() {
    let carbs,
      fat,
      protein,
      cals = 0;
    let carbsPercent,
      proteinPercent,
      fatPercent = 0;
    let food = {};
    let item = {};

    if (this.props.singleFood.nix_item_id) {
      food = this.props.singleFood;
      carbs = Math.ceil(food.nf_total_carbohydrate) * this.state.servings || 0;
      fat = Math.ceil(food.nf_total_fat) * this.state.servings || 0;
      protein = Math.ceil(food.nf_protein) * this.state.servings || 0;
      cals = food.nf_calories * this.state.servings;
      proteinPercent = Math.floor(((protein * 4) / cals) * 100);
      carbsPercent = Math.floor(((carbs * 4) / cals) * 100);
      fatPercent = Math.floor(((fat * 9) / cals) * 100);
      item = {
        mealType: this.props.meal,
        foodId: this.props.foodId,
        date: this.props.date,
        foodName: food.food_name,
        calories: Math.ceil(food.nf_calories),
        carbs: Math.ceil(food.nf_total_carbohydrate),
        fats: Math.ceil(food.nf_total_fat),
        protein: Math.ceil(food.nf_protein),
        cholesterol: Math.ceil(food.nf_cholesterol),
        fiber: Math.ceil(food.nf_dietary_fiber),
        potassium: Math.ceil(food.nf_potassium),
        sodium: Math.ceil(food.nf_sodium),
        sugar: Math.ceil(food.nf_sugars),
        brand: food.brand_name,
        servingSize: Math.ceil(food.serving_weight_grams),
        servings: +this.state.servings
      };
    }

    return this.props.singleFood.nix_item_id ? (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Search", {
                  meal: this.props.mealType
                });
              }}
            >
              <Text>Go Back</Text>
            </TouchableOpacity>

            <Text>Add Entry</Text>
            <TouchableOpacity
              onPress={async () => {
                await this.props.addItem({ ...item });
                this.props.navigation.navigate("Home");
              }}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.foodInfo}>
          <View style={styles.type}>
            <Text>Meal</Text>
            <Text>{this.props.meal}</Text>
          </View>
        </View>
        <View style={styles.food}>
          <Text style={styles.foodname}>{food.food_name}</Text>
          <Text style={styles.brand}>{food.brand_name}</Text>
        </View>
        <View style={styles.macros}>
          <View style={styles.cals}>
            <Text style={{ fontSize: 24 }}>{cals}</Text>
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
            <Text>{carbs}</Text>
            <Text>Carbs</Text>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "red" }}>{fatPercent}%</Text>
            <Text>{fat}g</Text>
            <Text>Fat</Text>
          </View>
          <View style={styles.macro}>
            <Text style={{ color: "purple" }}>{proteinPercent}%</Text>
            <Text>{protein}g</Text>
            <Text>Protein</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.servingContainer}>
          <View style={styles.serving}>
            <Text>Serving Size</Text>
            <Text>{food.serving_weight_grams} grams</Text>
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
              placeholder="1"
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
            <Text>{cals}</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Total Fat</Text>
            <Text>{fat} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Total Carbohydrates</Text>
            <Text>{carbs} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Protein</Text>
            <Text>{protein} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Cholesterol</Text>
            <Text>{food.nf_cholesterol * this.state.servings} mg</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Sodium</Text>
            <Text>{food.nf_sodium * this.state.servings} mg</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Dietary Fiber</Text>
            <Text>{food.nf_dietary_fiber * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Sugar</Text>
            <Text>{food.nf_sugars * this.state.servings} g</Text>
          </View>
          <View style={styles.nutri}>
            <Text>Potassium</Text>
            <Text>{food.nf_potassium * this.state.servings} mg</Text>
          </View>
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
  singleFood: state.singleFood,
  date: state.date.numberdate
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleFood);

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
  }
});
