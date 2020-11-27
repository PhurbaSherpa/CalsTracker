import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FoodEntry(props) {
  const { foodName, servings, calories } = props.food;
  const total = Math.floor(servings * calories);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("EditScreen", {
          meal: props.food.mealType,
          foodId: props.food.foodId,
          date: props.food.date
        })
      }
    >
      <View style={styles.foodContainer}>
        <View style={styles.food}>
          <View style={styles.foodInfo}>
            <Text style={styles.foodname}>{`${foodName}`}</Text>
            <Text
              style={styles.xsmall}
            >{`${servings} serving(s), ${calories}cals`}</Text>
          </View>
          <Text style={styles.cals}>{`${total}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  foodContainer: {
    borderColor: "grey",
    borderWidth: 0.5,
    height: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  food: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%"
  },
  foodname: {
    fontSize: 14,
    fontWeight: "700"
  },
  xsmall: {
    fontSize: 12,
    fontWeight: "300"
  }
});
