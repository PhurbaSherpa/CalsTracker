import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_ALL_DINNER = "GET_ALL_DINNER";
const ADD_DINNER = "ADD_DINNER";
/**
 * INITIAL STATE
 */
const defaultDinner = [];

/**
 * ACTION CREATORS
 */
const getAllDinner = dinners => ({ type: GET_ALL_DINNER, dinners });
const addDinner = dinner => ({ type: ADD_DINNER, dinner });

/**
 * THUNK CREATORS
 */
export const gotAllDinner = (mealtype, date) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.ip}/api/meals/${mealtype}/${date}`
    );
    dispatch(getAllDinner(data));
  } catch (error) {}
};

export const addDinnerThunk = dinner => async dispatch => {
  try {
    const { data } = await axios.post(
      `${process.env.ip}/api/meals/addItem`,
      dinner
    );
    dispatch(addDinner(data));
  } catch (error) {}
};
/**
 * REDUCER
 */
export default function(state = defaultDinner, action) {
  switch (action.type) {
    case GET_ALL_DINNER:
      return action.dinners;
    case ADD_DINNER:
      return [...state, action.dinner];
    default:
      return state;
  }
}
