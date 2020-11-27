/**
 * ACTION TYPES
 */
const GET_RESULT = "GET_RESULT";
/**
 * INITIAL STATE
 */

const defaultResults = [];

/**
 * ACTION CREATORS
 */
const gotResults = results => ({ type: GET_RESULT, results });

/**
 * THUNK CREATORS
 */
export const getResults = query => async dispatch => {
  try {
    const results = await fetch(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
      {
        headers: {
          "x-app-id": `${process.env.NUTRITION_ID}`,
          "x-app-key": `${process.env.NUTRITION_KEY}`
        }
      }
    );
    const data = await results.json();
    dispatch(gotResults(data.branded));
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function(state = defaultResults, action) {
  switch (action.type) {
    case GET_RESULT:
      return action.results ? action.results : state;
    default:
      return state;
  }
}
