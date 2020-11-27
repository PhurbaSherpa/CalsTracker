import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_MEALS = "GET_MEALS";
const DELETE_ITEM = "DELETE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const ADD_ITEM = "ADD_ITEM";

/**
 * INITIAL STATE
 */
const defaultMeals = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  total: 0,
  protein: 0,
  fats: 0,
  carbs: 0
};

/**
 * ACTION CREATORS
 */
const gotMeals = Meals => ({ type: GET_MEALS, Meals });
const deletedItem = item => ({ type: DELETE_ITEM, item });
const editedItem = item => ({ type: EDIT_ITEM, item });
const addedItem = item => ({ type: ADD_ITEM, item });

/**
 * THUNK CREATORS
 */

export const getMeals = date => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.ip}/api/meals/${date}`);
    dispatch(gotMeals(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (foodId, date, mealType) => async dispatch => {
  try {
    const { data } = await axios.delete(
      `${process.env.ip}/api/meals/${foodId}/${date}/${mealType}`
    );
    dispatch(deletedItem(data));
  } catch (error) {
    console.log(error);
  }
};

export const editItem = (
  foodId,
  mealType,
  date,
  servings
) => async dispatch => {
  try {
    const item = {
      foodId,
      mealType,
      date,
      servings
    };
    const { data } = await axios.put(`${process.env.ip}/api/meals/edit`, item);
    dispatch(editedItem(data));
  } catch (error) {
    console.log(error);
  }
};

export const addItem = item => async dispatch => {
  try {
    const { data } = await axios.post(`${process.env.ip}/api/meals/add`, item);
    dispatch(addedItem(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultMeals, action) {
  switch (action.type) {
    case GET_MEALS:
      let copy = [...action.Meals];
      let total = 0;
      let protein = 0;
      let fats = 0;
      let carbs = 0;
      copy.forEach(meal => {
        total += +meal.calories * +meal.servings;
        protein += +meal.protein * +meal.servings;
        fats += +meal.fats * +meal.servings;
        carbs += +meal.carbs * +meal.servings;
      });
      let breakfast = copy.filter(meal => {
        return meal.mealType === "Breakfast";
      });
      let lunch = copy.filter(meal => {
        return meal.mealType === "Lunch";
      });
      let dinner = copy.filter(meal => {
        return meal.mealType === "Dinner";
      });
      let snack = copy.filter(meal => {
        return meal.mealType === "Snack";
      });
      return {
        ...state,
        breakfast,
        lunch,
        dinner,
        snack,
        total,
        protein,
        fats,
        carbs
      };
    case DELETE_ITEM:
      switch (action.item.mealType) {
        case "Breakfast":
          let btotal = state.total;
          let bprotein = state.protein;
          let bfats = state.fats;
          let bcarbs = state.carbs;
          let bcopy = [...state.breakfast];
          bcopy = bcopy.filter(item => {
            if (item.foodId === action.item.foodId) {
              btotal -= +item.calories * +item.servings;
              bprotein -= +item.protein * +item.servings;
              bfats -= +item.fats * +item.servings;
              bcarbs -= +item.carbs * +item.servings;
            } else {
              return item;
            }
          });
          return {
            ...state,
            breakfast: bcopy,
            total: btotal,
            protein: bprotein,
            fats: bfats,
            carbs: bcarbs
          };
        case "Lunch":
          let ltotal = state.total;
          let lprotein = state.protein;
          let lfats = state.fats;
          let lcarbs = state.carbs;
          let lcopy = [...state.lunch];
          lcopy = lcopy.filter(item => {
            if (item.foodId === action.item.foodId) {
              ltotal -= +item.calories * +item.servings;
              lprotein -= +item.protein * +item.servings;
              lfats -= +item.fats * +item.servings;
              lcarbs -= +item.carbs * +item.servings;
            } else {
              return item;
            }
          });
          return {
            ...state,
            lunch: lcopy,
            total: ltotal,
            protein: lprotein,
            fats: lfats,
            carbs: lcarbs
          };
        case "Dinner":
          let dtotal = state.total;
          let dprotein = state.protein;
          let dfats = state.fats;
          let dcarbs = state.carbs;
          let dcopy = [...state.dinner];
          dcopy = dcopy.filter(item => {
            if (item.foodId === action.item.foodId) {
              dtotal -= +item.calories * +item.servings;
              dprotein -= +item.protein * +item.servings;
              dfats -= +item.fats * +item.servings;
              dcarbs -= +item.carbs * +item.servings;
            } else {
              return item;
            }
          });
          return {
            ...state,
            dinner: dcopy,
            total: dtotal,
            protein: dprotein,
            fats: dfats,
            carbs: dcarbs
          };
        case "Snack":
          let stotal = state.total;
          let sprotein = state.protein;
          let sfats = state.fats;
          let scarbs = state.carbs;
          let scopy = [...state.snack];
          scopy = scopy.filter(item => {
            if (item.foodId === action.item.foodId) {
              stotal -= +item.calories * +item.servings;
              sprotein -= +item.protein * +item.servings;
              sfats -= +item.fats * +item.servings;
              scarbs -= +item.carbs * +item.servings;
            } else {
              return item;
            }
          });
          return {
            ...state,
            snack: scopy,
            total: stotal,
            protein: sprotein,
            fats: sfats,
            carbs: scarbs
          };
        default:
          return state;
      }
    case EDIT_ITEM:
      let etotal = state.total;
      let eprotein = state.protein;
      let efats = state.fats;
      let ecarbs = state.carbs;
      switch (action.item.mealType) {
        case "Breakfast":
          let ebcopy = [...state.breakfast];
          ebcopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              etotal +=
                action.item.servings * action.item.calories -
                item.servings * item.calories;
              eprotein +=
                action.item.servings * action.item.protein -
                item.servings * item.protein;
              ecarbs +=
                action.item.servings * action.item.carbs -
                item.servings * item.carbs;
              efats +=
                action.item.servings * action.item.fats -
                item.servings * item.fats;
              item.servings = action.item.servings;
            }
          });
          return {
            ...state,
            breakfast: ebcopy,
            total: etotal,
            protein: eprotein,
            fats: efats,
            carbs: ecarbs
          };
        case "Lunch":
          let elcopy = [...state.lunch];
          elcopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              etotal +=
                action.item.servings * action.item.calories -
                item.servings * item.calories;
              eprotein +=
                action.item.servings * action.item.protein -
                item.servings * item.protein;
              ecarbs +=
                action.item.servings * action.item.carbs -
                item.servings * item.carbs;
              efats +=
                action.item.servings * action.item.fats -
                item.servings * item.fats;
              item.servings = action.item.servings;
            }
          });
          return {
            ...state,
            lunch: elcopy,
            total: etotal,
            protein: eprotein,
            fats: efats,
            carbs: ecarbs
          };
        case "Dinner":
          let edcopy = [...state.dinner];
          edcopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              etotal +=
                action.item.servings * action.item.calories -
                item.servings * item.calories;
              eprotein +=
                action.item.servings * action.item.protein -
                item.servings * item.protein;
              ecarbs +=
                action.item.servings * action.item.carbs -
                item.servings * item.carbs;
              efats +=
                action.item.servings * action.item.fats -
                item.servings * item.fats;
              item.servings = action.item.servings;
            }
          });
          return {
            ...state,
            dinner: edcopy,
            total: etotal,
            protein: eprotein,
            fats: efats,
            carbs: ecarbs
          };
        case "Snack":
          let escopy = [...state.snack];
          escopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              etotal +=
                action.item.servings * action.item.calories -
                item.servings * item.calories;
              eprotein +=
                action.item.servings * action.item.protein -
                item.servings * item.protein;
              ecarbs +=
                action.item.servings * action.item.carbs -
                item.servings * item.carbs;
              efats +=
                action.item.servings * action.item.fats -
                item.servings * item.fats;
              item.servings = action.item.servings;
            }
          });
          return {
            ...state,
            snack: escopy,
            total: etotal,
            protein: eprotein,
            fats: efats,
            carbs: ecarbs
          };
        default:
          return state;
      }
    case ADD_ITEM:
      let atotal = state.total;
      let aprotein = state.protein;
      let afats = state.fats;
      let acarbs = state.carbs;
      switch (action.item.mealType) {
        case "Breakfast":
          let abcopy = [...state.breakfast];
          let multiple = false;
          atotal += action.item.servings * action.item.calories;
          aprotein += action.item.servings * action.item.protein;
          acarbs += action.item.servings * action.item.carbs;
          afats += action.item.servings * action.item.fats;
          abcopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              item.servings = +action.item.servings + +item.servings;
              multiple = true;
            }
          });
          return {
            ...state,
            breakfast: multiple ? abcopy : [...state.breakfast, action.item],
            total: atotal,
            protein: aprotein,
            carbs: acarbs,
            fats: afats
          };
        case "Lunch":
          atotal += action.item.servings * action.item.calories;
          atotal += action.item.servings * action.item.calories;
          aprotein += action.item.servings * action.item.protein;
          acarbs += action.item.servings * action.item.carbs;
          afats += action.item.servings * action.item.fats;
          multiple = false;
          let alcopy = [...state.lunch];
          alcopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              item.servings = +action.item.servings + +item.servings;
              multiple = true;
            }
          });
          return {
            ...state,
            lunch: multiple ? alcopy : [...state.lunch, action.item],
            total: atotal,
            protein: aprotein,
            carbs: acarbs,
            fats: afats
          };
        case "Dinner":
          atotal += action.item.servings * action.item.calories;
          atotal += action.item.servings * action.item.calories;
          aprotein += action.item.servings * action.item.protein;
          acarbs += action.item.servings * action.item.carbs;
          afats += action.item.servings * action.item.fats;
          multiple = false;
          let adcopy = [...state.dinner];
          adcopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              item.servings = +action.item.servings + +item.servings;
              multiple = true;
            }
          });
          return {
            ...state,
            dinner: multiple ? adcopy : [...state.dinner, action.item],
            total: atotal,
            protein: aprotein,
            carbs: acarbs,
            fats: afats
          };
        case "Snack":
          atotal += action.item.servings * action.item.calories;
          atotal += action.item.servings * action.item.calories;
          aprotein += action.item.servings * action.item.protein;
          acarbs += action.item.servings * action.item.carbs;
          afats += action.item.servings * action.item.fats;
          multiple = false;
          let ascopy = [...state.snack];
          ascopy.forEach(item => {
            if (item.foodId === action.item.foodId) {
              item.servings = +action.item.servings + +item.servings;
              multiple = true;
            }
          });
          return {
            ...state,
            snack: multiple ? ascopy : [...state.snack, action.item],
            total: atotal,
            protein: aprotein,
            carbs: acarbs,
            fats: afats
          };
        default:
          return state;
      }
    default:
      return state;
  }
}
