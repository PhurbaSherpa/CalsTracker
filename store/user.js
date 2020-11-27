import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const EDIT_USER = "EDIT_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateUser = user => ({ type: EDIT_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.ip}/auth/me`);
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const signUp = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`${process.env.ip}/auth/signup`, {
      email,
      password,
      firstName,
      lastName
    });
    dispatch(getUser(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (email, password) => async dispatch => {
  try {
    const { data } = await axios.post(`${process.env.ip}/auth/login`, {
      email,
      password
    });
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`${process.env.ip}/auth/logout`);
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const changeUser = item => async dispatch => {
  try {
    const { data } = await axios.put(`${process.env.ip}/api/users/`, item);
    dispatch(updateUser(data));
  } catch (error) {
    console.log("change", error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case EDIT_USER:
      return action.user;
    default:
      return state;
  }
}
