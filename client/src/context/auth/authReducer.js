import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_FAIL,
  USER_UPDATE,
} from '../type';

export default (state, action) => {
  switch (action.type) {
    //Register and log user
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      //set token on local storage
      localStorage.setItem('token', action.payload);
      //change the State
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    //USER LOADED
    case USER_LOADED:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: action.payload,
      };

    //Login, Register fail, Auth error and Logout
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      //Clean the toke
      localStorage.removeItem('token');

      //change the state
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case USER_UPDATE:
      return {
        ...state,
        msg: action.payload,
      };

    case UPDATE_FAIL:
      return {
        ...state,
        user: action.payload.user,
        error: action.payload.msg,
      };
    default:
      return state;
  }
};
