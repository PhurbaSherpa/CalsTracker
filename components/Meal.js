import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FoodEntry from "./FoodEntry";

export default function Meal(props) {
  const meal = props.meal;
  const foodList = props.list;
  let total = 0;
  foodList.forEach(food => {
    total += Math.floor(food.calories * food.servings);
  });

  return (
    <View>
      <View style={styles.mealContainer}>
        <View style={styles.meal}>
          <Text style={styles.mealTitle}>{`${meal}`}</Text>
          <Text style={styles.totalcals}>{`${total}`}</Text>
        </View>
      </View>
      <View>
        {foodList.map((food, index) => {
          return (
            <FoodEntry navigation={props.navigation} key={index} food={food} />
          );
        })}
      </View>
      <View style={styles.addfood}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Search", { meal: props.meal })
          }
        >
          <Text>+ ADD FOOD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealContainer: {
    backgroundColor: "rgb(0, 153, 204)",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  meal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%"
  },
  mealTitle: {
    fontSize: 20
  },
  addfood: {
    height: 40,
    justifyContent: "center",
    marginLeft: 10
  }
});
