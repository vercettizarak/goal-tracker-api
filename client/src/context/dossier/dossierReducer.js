import {
  SAVE_SUCCESS,
  SAVE_FAILED,
  STATUS_SUCCESS,
  DAYS_RECEIVE,
  DAYS_FAIL,
  WEEKS_FAIL,
  WEEKS_RECEIVE,
  MONTHS_FAIL,
  MONTHS_RECEIVE,
  QUARTER_FAIL,
  QUARTER_RECEIVE,
  YEARS_FAIL,
  YEARS_RECEIVE,
  GOAL_DONE,
  GOAL_UNDONE,
  DELETE_GOAL,
  TASK_DONE,
  TASK_UNDONE,
  ADD_TASK,
  DELETE_TASK,
  ADD_GOAL,
  SET_ALERT,
  REMOVE_ALERT,
} from '../type';

export default (state, action) => {
  switch (action.type) {
    //set Alert
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };

    //Remove Alert
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload),
      };

    case STATUS_SUCCESS: {
      return {
        ...state,
        status: action.payload.status,
      };
    }

    //Get days
    case DAYS_RECEIVE:
      return {
        ...state,
        entries: { ...state.entries, days: action.payload },
      };

    //Gets week
    case WEEKS_RECEIVE:
      return {
        ...state,
        entries: { ...state.entries, weeks: action.payload },
      };

    //Gets month
    case MONTHS_RECEIVE:
      return {
        ...state,
        entries: { ...state.entries, months: action.payload },
      };

    //Gets quarter
    case QUARTER_RECEIVE:
      return {
        ...state,
        entries: { ...state.entries, quarters: action.payload },
      };

    //Gets year
    case YEARS_RECEIVE:
      return {
        ...state,
        entries: { ...state.entries, years: action.payload },
      };

    //Sucess response
    case SAVE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        msg: action.payload,
      };

    case YEARS_FAIL:
    case QUARTER_FAIL:
    case MONTHS_FAIL:
    case WEEKS_FAIL:
    case DAYS_FAIL:
    case SAVE_FAILED:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };

    /*************
      TODOs and GOALS
      */
    //Save on local storage
    case DELETE_TASK:
    case ADD_TASK:
    case TASK_UNDONE:
    case TASK_DONE:
      localStorage.setItem('todoList', JSON.stringify(action.payload));
      return { ...state };

    //Add goal
    case ADD_GOAL:
      localStorage.setItem('unfinished', JSON.stringify(action.payload));
      //return state
      return { ...state };

    //Save changes on local Storage
    case GOAL_DONE:
    case GOAL_UNDONE:
    case DELETE_GOAL:
      //save on the local storage
      localStorage.setItem(
        'unfinished',
        JSON.stringify(action.payload.unfinished)
      );
      localStorage.setItem('finished', JSON.stringify(action.payload.finished));
      //return state
      return { ...state };

    default:
      return state;
  }
};
