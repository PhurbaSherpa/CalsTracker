import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_DETAILS = "GET_DETAILS";
const NEW_USER_DETAILS = "NEW_USER_DETAILS";

/**
 * INITIAL STATE
 */
const defaultDetails = {};

/**
 * ACTION CREATORS
 */
const gotDetails = details => ({ type: GET_DETAILS, details });
const newUserDetails = details => ({ type: NEW_USER_DETAILS, details });

/**
 * THUNK CREATORS
 */

export const getDetails = () => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.ip}/api/users/details`);
    dispatch(gotDetails(data));
  } catch (error) {
    console.log(error);
  }
};

export const addNewUserDetails = (
  gender,
  age,
  weight,
  feet,
  inches,
  activityType
) => async dispatch => {
  try {
    const { data } = await axios.post(`${process.env.ip}/api/users/details`, {
      gender,
      age,
      weight,
      feet,
      inches,
      activityType
    });
    dispatch(newUserDetails(data));
  } catch (error) {
    console.log(error);
  }
};

export const editUserDetails = (
  gender,
  age,
  weight,
  feet,
  inches,
  activityType
) => async dispatch => {
  console.log("thunk", gender, age, weight, feet, inches, activityType);
  try {
    const { data } = await axios.put(`${process.env.ip}/api/users/details`, {
      gender,
      age,
      weight,
      feet,
      inches,
      activityType
    });
    console.log("updated", data);
    dispatch(newUserDetails(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultDetails, action) {
  switch (action.type) {
    case GET_DETAILS:
      return action.details;
    case NEW_USER_DETAILS:
      return action.details;
    default:
      return state;
  }
}
