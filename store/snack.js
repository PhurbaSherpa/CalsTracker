import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_ALL_SNACKS = "GET_ALL_SNACKS";
const ADD_SNACK = "ADD_SNACK";
/**
 * INITIAL STATE
 */
const defaultSnack = [];

/**
 * ACTION CREATORS
 */
const getAllSnacks = snacks => ({ type: GET_ALL_SNACKS, snacks });
const addSnack = snack => ({ type: ADD_SNACK, snack });

/**
 * THUNK CREATORS
 */
export const gotAllSnacks = (mealtype, date) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.ip}/api/meals/${mealtype}/${date}`
    );
    dispatch(getAllSnacks(data));
  } catch (error) {}
};

export const addSnackThunk = snack => async dispatch => {
  try {
    const { data } = await axios.post(
      `${process.env.ip}/api/meals/addItem`,
      snack
    );
    dispatch(addSnack(data));
  } catch (error) {}
};

/**
 * REDUCER
 */
export default function(state = defaultSnack, action) {
  switch (action.type) {
    case GET_ALL_SNACKS:
      return action.snacks;
    case ADD_SNACK:
      return [...state, action.snack];
    default:
      return state;
  }
}
