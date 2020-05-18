import React, { useState, useContext, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DossierContext from '../../../context/dossier/dossierContext';
import { WRITE, READ } from './types';
import AlertSaved from '../Alert/AlertSaved';

const WeekEditor = () => {
  //init Context and extract function
  const dossierContext = useContext(DossierContext);
  const {
    saveWeek,
    entries: { weeks },
    getWeeks,
    getStatus,
    status,
  } = dossierContext;
  const goalsFinished = JSON.parse(localStorage.getItem('finished')) || [];
  const goalsUnfinished = JSON.parse(localStorage.getItem('unfinished')) || [];

  const [showWeek, setShowWeek] = useState(null);
  const [week, setWeek] = useState();
  const [route, setRoute] = useState(WRITE);
  const [isDone, setisDone] = useState(false);
  let actual;

  useEffect(() => {
    getWeeks();
    getStatus();
    // eslint-disable-next-line
  }, []);

  if (status) {
    actual = status.week + 1;
  }

  const weekTemplate = `
  <h3>Week ${actual} , Date: ${new Date().getMonth() + 1}/
  ${new Date().getDate()}/
  ${new Date().getFullYear()}:  
  </h3>
  &nbsp
  <h4>Health:</h4>
  <strong><em>Mind:</em></strong>
  <br>
  <br>
  <strong><em>Body:</em></strong>
  <p>
  <h4>Wealth:</h4>
  <strong><em>Career:</em></strong>
  <br>
  <br>
  <strong><em>Business:</em></strong>
  <p>
  <h4>Social and Leisure:</h4>
  <strong><em>Game:</em></strong>
  <br>
  <br>
  <strong><em>Social:</em></strong>
  <br>
  <br>
  <strong><em>Hobbies:</em></strong>
  <p>
  <h4>Week Evaluation:</h4>
  <strong><em>Goal Accomplished:</em></strong>
  <ul>
  ${
    goalsFinished.length > 0
      ? goalsFinished.map(todo => `<li>${todo.task}</li>`)
      : 'No Goals'
  }
  </ul>
  <br>
  <strong><em>Goal Missed:</em></strong>
  <ul>
  ${
    goalsUnfinished.length > 0
      ? goalsUnfinished.map(todo => `<li>${todo.task}</li>`)
      : 'No Goals'
  }
  </ul>
  <p>
  <h4>Next Week:</h4>
  <strong><em>Next Week Plan:</em></strong>
  <br>
  <br>
  <strong><em>Next Week Goals and Schedule:</em></strong>
  
  `;

  const onChange = (event, editor) => {
    const data = editor.getData();
    setWeek(data);
  };

  const onSubmit = () => {
    if (week) {
      saveWeek(week);
      console.log('hi', week);
      setWeek(weekTemplate);
      setisDone(true);
    }
  };

  const choseWeek = week => {
    setShowWeek(week.data);
  };

  return (
    <div>
      <h4 className='text-primary text-center mb-4'>Week Review</h4>
      <hr />
      <br />
      {route === WRITE ? (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => {
                setRoute(READ);
              }}>
              Read Weeks Entries{' '}
            </button>
          </div>
          <br />
          {isDone === false ? (
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={weekTemplate}
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
            <AlertSaved text={'Week'} />
          )}
        </div>
      ) : (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => setRoute(WRITE)}>
              Write Week Entry{' '}
            </button>
          </div>
          <br />
          {showWeek && (
            <CKEditor editor={ClassicEditor} data={showWeek} disabled={true} />
          )}
          <hr />
          <div className='mb-2'>
            {weeks !== null && weeks.length > 0 ? (
              weeks.map(week => (
                <button
                  className='btn btn-outline-primary mr-3'
                  key={week._id}
                  onClick={() => choseWeek(week)}>
                  {week.num}
                </button>
              ))
            ) : (
              <h3>No weeks saved</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekEditor;
