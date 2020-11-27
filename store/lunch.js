import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_ALL_LUNCHES = "GET_ALL_LUNCHES";
const ADD_LUNCH = "ADD_LUNCH";
/**
 * INITIAL STATE
 */
const defaultLunch = [];

/**
 * ACTION CREATORS
 */
const getAllLunches = lunches => ({ type: GET_ALL_LUNCHES, lunches });
const addLunch = lunch => ({ type: ADD_LUNCH, lunch });

/**
 * THUNK CREATORS
 */
export const gotAllLunches = (mealtype, date) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.ip}/api/meals/${mealtype}/${date}`
    );

    dispatch(getAllLunches(data));
  } catch (error) {}
};

export const addLunchThunk = lunch => async dispatch => {
  try {
    const { data } = await axios.post(
      `${process.env.ip}/api/meals/addItem`,
      lunch
    );
    dispatch(addLunch(data));
  } catch (error) {}
};

/**
 * REDUCER
 */
export default function(state = defaultLunch, action) {
  switch (action.type) {
    case GET_ALL_LUNCHES:
      return action.lunches;
    case ADD_LUNCH:
      return [...state, action.lunch];
    default:
      return state;
  }
}
