import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import singleFood from "./singleFood";
import details from "./userDetails";
import meals from "./meals";
import date from "./date";
import allResults from "./results";
require("../secrets");

const reducer = combineReducers({
  user,
  singleFood,
  meals,
  details,
  date,
  allResults
});

const rootReducer = (state, action) => {
  if (action.type === "REMOVE_USER") {
    state = undefined;
  }
  if (action.type === "ADD_ITEM" || action.type === "GET_MEALS") {
    state = { ...state, allResults: [] };
  }
  return reducer(state, action);
};
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store;
export * from "./user";
export * from "./singleFood";
export * from "./breakfast";
export * from "./lunch";
export * from "./dinner";
export * from "./snack";
export * from "./userDetails";
export * from "./date";
export * from "./results";
