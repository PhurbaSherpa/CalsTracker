/**
 * ACTION TYPES
 */
const SET_DATE = "SET_DATE";
/**
 * INITIAL STATE
 */

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const date = new Date().getDate();
const day = new Date().getDay();
const month = new Date().getMonth();
const numberdate = `${day},${month},${date}`;
const stringdate = `${days[day]},${months[month]} ${date}`;
const fulldate = new Date();

const defaultDate = { numberdate, stringdate, fulldate };

/**
 * ACTION CREATORS
 */
const settingDate = date => ({ type: SET_DATE, date });

/**
 * THUNK CREATORS
 */
export const setDate = date => async dispatch => {
  try {
    dispatch(settingDate(date));
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function(state = defaultDate, action) {
  switch (action.type) {
    case SET_DATE:
      if (date) {
        const newdate = new Date(action.date).getDate();
        const newday = new Date(action.date).getDay();
        const newmonth = new Date(action.date).getMonth();
        const year = new Date(action.date).getFullYear();
        const newnumberdate = `${newday},${newmonth},${newdate}`;
        const newstringdate = `${days[newday]},${months[newmonth]} ${newdate}`;
        const newfulldate = new Date(year, newmonth, newdate);
        return {
          numberdate: newnumberdate,
          stringdate: newstringdate,
          fulldate: newfulldate
        };
      } else return state;

    default:
      return state;
  }
}
