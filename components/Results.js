import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";
import { getSingleFood } from "../store/singleFood";

function Results(props) {
  return (
    <ScrollView style={styles.resultsOuter}>
      {props.allResults.map(food => {
        return (
          <View key={food.nix_item_id} style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.resultContainer}
              onPress={async () => {
                await props.getSingleFood(food.nix_item_id);
                props.navigation.navigate("SingleFood", {
                  meal: props.meal,
                  foodId: food.nix_item_id
                });
              }}
            >
              <View style={{ width: "86%" }}>
                <Text
                  style={{ width: "70%" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {food.food_name}
                </Text>
                <Text style={{ color: "grey" }}>{food.brand_name}</Text>
              </View>

              <Text>{food.nf_calories}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  allResults: state.allResults
});

const mapDispatchToProps = dispatch => ({
  getSingleFood: nixID => dispatch(getSingleFood(nixID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);

const styles = StyleSheet.create({
  resultContainer: {
    top: "2%",
    flexDirection: "row",
    height: 50
  }
});
