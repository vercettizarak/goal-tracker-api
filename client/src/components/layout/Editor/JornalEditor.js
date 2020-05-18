import React, { useState, useContext, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DossierContext from '../../../context/dossier/dossierContext';
import { WRITE, READ } from './types';
import AlertSaved from '../Alert/AlertSaved';

const JournalEditor = () => {
  //init Context and extract function
  const dossierContext = useContext(DossierContext);
  const {
    saveDay,
    entries: { days },
    getDays,
    getStatus,
    status,
  } = dossierContext;

  const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  const todoDone = todoList.filter(todo => todo.isDone === true);
  const todoMissed = todoList.filter(todo => todo.isDone !== true);

  const [showDay, setShowDay] = useState(null);
  const [day, setDay] = useState();
  const [route, setRoute] = useState(WRITE);
  const [isDone, setisDone] = useState(false);
  let atual;

  useEffect(() => {
    getDays();
    getStatus();
    // eslint-disable-next-line
  }, []);

  if (status) {
    atual = status.day + 1;
  }

  const dayTemplate = `
  <h3>Day ${atual} , Date: ${new Date().getMonth() + 1}/
  ${new Date().getDate()}/
  ${new Date().getFullYear()}:  
  </h3>
  &nbsp
  <br>
  <h4>Work Summary:</h4>
  <br>
  <h4>Meal Summary:</h4>
  <br>
  <h4>Workout Summary:</h4>
  <br>
  <h4>Task done today :</h4>
  <ul>
  ${
    todoDone.length > 0
      ? todoDone.map(todo => `<li>${todo.task}</li>`)
      : 'Nos tasks'
  }
  </ul>
  <h4>Task Missed today :</h4>
  <ul>
  ${
    todoMissed.length > 0
      ? todoMissed.map(todo => `<li>${todo.task}</li>`)
      : 'Nos tasks'
  }
  </ul>
  <br>
  <h4>What have you learned today?:</h4>
  <br>
  <h4>Plans for tomorrow:</h4>
  <br>
  `;

  const onChange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    console.log(todoList);
    setDay(data);
  };

  const choseDay = day => {
    setShowDay(day.data);
  };

  const onSubmit = () => {
    if (day) {
      saveDay(day);
      console.log(day);
      setDay(dayTemplate);
      setisDone(true);
    }
  };

  return (
    <div>
      <h4 className='text-primary text-center mb-4'>My Journal</h4>
      <hr />
      {route === WRITE ? (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => {
                setRoute(READ);
              }}>
              Read Journal{' '}
            </button>
          </div>
          {isDone === false ? (
            <div className='mt-3'>
              <CKEditor
                editor={ClassicEditor}
                data={dayTemplate}
                onChange={onChange}
                disabled={false}
              />
              <br />
              <br />
              <div className='clearfix my-4'>
                <button
                  className='float-right btn btn-primary w-25'
                  onClick={onSubmit}>
                  Save{' '}
                </button>
              </div>
            </div>
          ) : (
            <AlertSaved text={'day'} />
          )}
          <br />
        </div>
      ) : (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => setRoute(WRITE)}>
              Write Journal{' '}
            </button>
          </div>
          <br />
          {showDay && (
            <CKEditor editor={ClassicEditor} data={showDay} disabled={true} />
          )}
          <hr />
          <div className='mb-2'>
            {days !== null && days.length > 0 ? (
              days.map(day => (
                <button
                  className='btn btn-outline-primary mr-3 mb-2'
                  key={day._id}
                  onClick={() => choseDay(day)}>
                  {day.num}
                </button>
              ))
            ) : (
              <h3>No days saved</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEditor;
