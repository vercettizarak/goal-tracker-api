import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  USER_UPDATE,
  UPDATE_FAIL,
} from '../type';

const AuthState = props => {
  const initState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initState);

  //load User
  const loadUser = async () => {
    console.log(localStorage.getItem('token'));
    setAuthToken(localStorage.getItem('token'));
    //Make a Get request
    try {
      const res = await axios.get('/api/user');
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response,
      });
    }
  };

  //Register
  const registerUser = async formData => {
    //Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //Make a Post request
    try {
      const res = await axios.post('/api/user', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      //load User
      loadUser();

      //catch error
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response,
      });
    }
  };

  //Login
  const loginUser = async formData => {
    //set headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //Make Post request to the server
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      //load User
      loadUser();

      //catch errors
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response,
      });
    }
  };

  //log out
  const logOut = () => {
    //dispatch action to reduce
    dispatch({ type: LOGOUT });
  };

  const updateUser = async formData => {
    //Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //Make a Put request
    try {
      const res = await axios.put('/api/user', formData, config);
      dispatch({
        type: USER_UPDATE,
        payload: res.data,
      });

      //catch error
    } catch (err) {
      dispatch({
        type: UPDATE_FAIL,
        payload: err.response,
      });
    }
    //dispatch to the reducer
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        logOut,
        loadUser,
        loginUser,
        updateUser,
        registerUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
