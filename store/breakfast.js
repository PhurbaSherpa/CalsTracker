import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_ALL_BREAKFAST = "GET_ALL_BREAKFAST";
const ADD_BREAKFAST = "ADD_BREAKFAST";
/**
 * INITIAL STATE
 */
const defaultBreakfast = [];

/**
 * ACTION CREATORS
 */
const getAllBreakfast = breakfasts => ({ type: GET_ALL_BREAKFAST, breakfasts });
const addBreakfast = breakfast => ({ type: ADD_BREAKFAST, breakfast });

/**
 * THUNK CREATORS
 */
export const gotAllBreakfast = (mealtype, date) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.ip}/api/meals/${mealtype}/${date}`
    );
    dispatch(getAllBreakfast(data));
  } catch (error) {
    console.log(error);
  }
};

export const addBreakfastThunk = breakfast => async dispatch => {
  try {
    const { data } = await axios.post(
      `${process.env.ip}/api/meals/addItem`,
      breakfast
    );
    dispatch(addBreakfast(data));
  } catch (error) {}
};

/**
 * REDUCER
 */
export default function(state = defaultBreakfast, action) {
  switch (action.type) {
    case GET_ALL_BREAKFAST:
      return action.breakfasts;
    case ADD_BREAKFAST:
      return [...state, action.breakfast];
    default:
      return state;
  }
}
