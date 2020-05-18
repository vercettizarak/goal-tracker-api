import React, { useReducer } from 'react';
import DossierContext from './dossierContext';
import DossierReducer from './dossierReducer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  STATUS_ERROR,
  STATUS_SUCCESS,
  DAYS_RECEIVE,
  DAYS_FAIL,
  WEEKS_FAIL,
  WEEKS_RECEIVE,
  MONTHS_RECEIVE,
  MONTHS_FAIL,
  QUARTER_RECEIVE,
  QUARTER_FAIL,
  YEARS_RECEIVE,
  YEARS_FAIL,
  ADD_GOAL,
  GOAL_DONE,
  GOAL_UNDONE,
  DELETE_GOAL,
  ADD_TASK,
  DELETE_TASK,
  TASK_DONE,
  TASK_UNDONE,
  SET_ALERT,
  REMOVE_ALERT,
} from '../type';

const DossierState = props => {
  //set initial state
  const initialState = {
    alerts: [],
    entries: {
      days: null,
      weeks: null,
      months: null,
      quarters: null,
      years: null,
    },
  };

  //Headers for json post request
  const configJson = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const [state, dispatch] = useReducer(DossierReducer, initialState);

  //Set Alert
  const setAlert = (msg, type, timout = 30000) => {
    const id = uuidv4();

    console.log('this function was called');
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    //Remove alert
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timout);
  };

  //User status
  const getStatus = async () => {
    //get user status
    try {
      const res = await axios.get('api/user/status');

      //Dispatch action to reducer
      dispatch({
        type: STATUS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STATUS_ERROR,
        payload: err.response,
      });
    }
  };

  //Save day
  const saveDay = async day => {
    //Make post request
    try {
      const newDay = {
        data: day,
        tasks: JSON.parse(localStorage.getItem('todoList')) || [],
      };
      const res = await axios.post('/api/days', newDay, configJson);

      // Set Alert success
      setAlert(res.data, 'success');
    } catch (err) {
      //Set Alert danger
      console.log(err.response);
      setAlert(err.response.data, 'danger');
    }
  };

  //Get days
  const getDays = async () => {
    //Make get requet
    try {
      const res = await axios.get(`/api/days`);
      console.log(res.data);

      //Dispatch action to reducer
      dispatch({
        type: DAYS_RECEIVE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: DAYS_FAIL,
        payload: err.response,
      });
    }
  };

  //Save week
  const saveWeek = async week => {
    const thisWeek = {
      data: week,
      goals: {
        finished: JSON.parse(localStorage.getItem('finished')) || [],
        unfinished: JSON.parse(localStorage.getItem('unfinished')) || [],
      },
    };

    //Make post request
    try {
      const res = await axios.post('/api/weeks', thisWeek, configJson);

      // Set Alert success
      setAlert(res.data, 'success');
    } catch (err) {
      //Set Alert danger
      console.log(err.response);
      setAlert(err.response.data, 'danger');
    }
  };

  //Get Weeks
  const getWeeks = async () => {
    //Make get requet
    try {
      const res = await axios.get(`/api/weeks`);
      console.log(res.data);

      //Dispatch action to reducer
      dispatch({
        type: WEEKS_RECEIVE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WEEKS_FAIL,
        payload: err.response,
      });
    }
  };

  //Save month
  const saveMonth = async month => {
    //Make post request
    try {
      const res = await axios.post('/api/months', { data: month }, configJson);

      // Set Alert success
      setAlert(res.data, 'success');
    } catch (err) {
      //Set Alert danger
      console.log(err.response);
      setAlert(err.response.data, 'danger');
    }
  };

  //Get Months
  const getMonths = async () => {
    //Make get resuest
    try {
      const res = await axios.get('/api/months');
      console.log(res.data);

      //Dispatch action to reducer
      dispatch({
        type: MONTHS_RECEIVE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MONTHS_FAIL,
        payload: err.response,
      });
    }
  };

  //Save Quarter
  const saveQuarter = async quarter => {
    //Make post request
    try {
      const res = await axios.post(
        '/api/quarters',
        { data: quarter },
        configJson
      );

      // Set Alert success
      setAlert(res.data, 'success');
    } catch (err) {
      //Set Alert danger
      console.log(err.response);
      setAlert(err.response.data, 'danger');
    }
  };

  //Get Quarter
  const getQuarters = async () => {
    //Make get request
    try {
      const res = await axios.get('/api/quarters');
      console.log(res.data);

      //Dispatch action to reducer
      dispatch({
        type: QUARTER_RECEIVE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: QUARTER_FAIL,
        payload: err.response,
      });
    }
  };

  //Save Year
  const saveYear = async year => {
    //Make post request
    try {
      const res = await axios.post('/api/years', { data: year }, configJson);

      // Set Alert success
      setAlert(res.data, 'success');
    } catch (err) {
      //Set Alert danger
      console.log(err.response);
      setAlert(err.response.data, 'danger');
    }
  };

  //Get Year
  const getYears = async () => {
    //Make get request
    try {
      const res = await axios.get('/api/years');
      console.log(res.data);

      //Dispatch action to reducer
      dispatch({
        type: YEARS_RECEIVE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: YEARS_FAIL,
        payload: err.response,
      });
    }
  };

  /*****************
   * Weekly goals
   */

  //Add Goal
  const addGoal = goal => {
    //create newGoal to the goal
    const newGoal = { task: goal, id: uuidv4() };

    //get the unfinished goals array
    const unfinished = JSON.parse(localStorage.getItem('unfinished')) || [];
    unfinished.push(newGoal);

    //dispatch Goal to the reducer
    dispatch({
      type: ADD_GOAL,
      payload: unfinished,
    });
  };

  //Complete Goal
  const goalDone = id => {
    //Move the goal from unfinished to finished
    const unfinished = JSON.parse(localStorage.getItem('unfinished')).filter(
      goal => goal.id !== id
    );

    const finished = [
      ...(JSON.parse(localStorage.getItem('finished')) || []),
      ...JSON.parse(localStorage.getItem('unfinished')).filter(
        goal => goal.id === id
      ),
    ];

    //dispatch to the reducer
    dispatch({
      type: GOAL_DONE,
      payload: { unfinished, finished },
    });
  };

  //Undo Goal
  const undoGoal = id => {
    //Move the goal from finished to unfinished

    const unfinished = [
      ...JSON.parse(localStorage.getItem('unfinished')),
      ...JSON.parse(localStorage.getItem('finished')).filter(
        goal => goal.id === id
      ),
    ];

    const finished = JSON.parse(localStorage.getItem('finished')).filter(
      goal => goal.id !== id
    );

    //Send to reducer
    dispatch({
      type: GOAL_UNDONE,
      payload: { unfinished, finished },
    });
  };

  //Delete Goal
  const deleteGoal = id => {
    //Remove from the goal from the arrays
    const unfinished = JSON.parse(localStorage.getItem('unfinished')).filter(
      goal => goal.id !== id
    );

    const finished = JSON.parse(localStorage.getItem('finished')).filter(
      goal => goal.id !== id
    );

    dispatch({
      type: DELETE_GOAL,
      payload: { unfinished, finished },
    });
  };

  /*****************
   * Task
   */

  //Add task
  const addTask = task => {
    //Add id to the task
    task.id = uuidv4();
    task.isDone = false;
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList.push(task);

    //dispatch task to the reducer
    dispatch({
      type: ADD_TASK,
      payload: todoList,
    });
  };

  //Delete task
  const deleteTask = id => {
    //Remove task from todoList array
    const todoList = JSON.parse(localStorage.getItem('todoList')).filter(
      task => task.id !== id
    );

    //dispatch it to the reducer
    dispatch({
      type: DELETE_TASK,
      payload: todoList,
    });
  };

  //Complete a Task
  const taskDone = id => {
    //Change the taskisDone
    const todoList = JSON.parse(localStorage.getItem('todoList')).map(todo =>
      todo.id === id ? { ...todo, isDone: true } : todo
    );

    //dispatch action and payload to reducer
    dispatch({
      type: TASK_DONE,
      payload: todoList,
    });
  };

  //Undo a Task
  const taskUnDone = id => {
    //change the task.isDone
    const todoList = JSON.parse(localStorage.getItem('todoList')).map(todo =>
      todo.id === id ? { ...todo, isDone: false } : todo
    );

    dispatch({
      type: TASK_UNDONE,
      payload: todoList,
    });
  };

  return (
    <DossierContext.Provider
      value={{
        alerts: state.alerts,
        status: state.status,
        entries: state.entries,
        getDays,
        saveDay,
        getWeeks,
        saveWeek,
        getYears,
        saveYear,
        getStatus,
        saveMonth,
        getMonths,
        getQuarters,
        saveQuarter,
        weeklyGoals: state.weeklyGoals,
        todoList: state.todoList,
        addGoal,
        goalDone,
        undoGoal,
        deleteGoal,
        addTask,
        deleteTask,
        taskDone,
        taskUnDone,
      }}>
      {props.children}
    </DossierContext.Provider>
  );
};

export default DossierState;
