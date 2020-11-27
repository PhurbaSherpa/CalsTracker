import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_SINGLE_FOOD = "GET_SINGLE_FOOD";

/**
 * INITIAL STATE
 */
const defaultSingleFood = {};

/**
 * ACTION CREATORS
 */
const gotSingleFood = SingleFood => ({ type: GET_SINGLE_FOOD, SingleFood });

/**
 * THUNK CREATORS
 */

export const getSingleFood = foodId => async dispatch => {
  try {
    if (foodId.length === 12) {
      const barcode = await fetch(
        `https://trackapi.nutritionix.com/v2/search/item?upc=${foodId}`,
        {
          headers: {
            "x-app-id": `${process.env.NUTRITION_ID}`,
            "x-app-key": `${process.env.NUTRITION_KEY}`
          }
        }
      );
      const barcodeData = await barcode.json();
      dispatch(gotSingleFood(barcodeData.foods[0]));
    } else {
      const nixId = await fetch(
        `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${foodId}`,
        {
          headers: {
            "x-app-id": `${process.env.NUTRITION_ID}`,
            "x-app-key": `${process.env.NUTRITION_KEY}`
          }
        }
      );
      const nixIdData = await nixId.json();
      dispatch(gotSingleFood(nixIdData.foods[0]));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleItem = (foodId, mealType, date) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.ip}/api/singleFood/${foodId}/${mealType}/${date}`
    );
    dispatch(gotSingleFood(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultSingleFood, action) {
  switch (action.type) {
    case GET_SINGLE_FOOD:
      return action.SingleFood;
    default:
      return state;
  }
}
