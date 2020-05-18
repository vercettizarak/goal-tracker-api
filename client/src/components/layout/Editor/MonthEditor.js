import React, { useState, useContext, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DossierContext from '../../../context/dossier/dossierContext';
import { WRITE, READ } from './types';
import AlertSaved from '../Alert/AlertSaved';

const MonthEditor = () => {
  //init Context and extract function
  const dossierContext = useContext(DossierContext);
  const {
    saveMonth,
    entries: { months },
    getMonths,
    getStatus,
    status,
  } = dossierContext;

  const [showMonth, setShowMonth] = useState(null);
  const [month, setMonth] = useState();
  const [route, setRoute] = useState(WRITE);
  const [isDone, setisDone] = useState(false);
  let actual;

  useEffect(() => {
    getMonths();
    getStatus();
    // eslint-disable-next-line
  }, []);

  if (status) {
    actual = status.month + 1;
  }

  const monthTemplate = `
  <h3>Month ${actual} , Date: ${new Date().getMonth() + 1}/
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
  <h4>Month Evaluation:</h4>
  <strong><em>Goal Accomplished:</em></strong>
  <br>
  <br>
  <strong><em>Goal Missed:</em></strong>
  <p>
  <h4>Next Month:</h4>
  <strong><em>Next Month Plan:</em></strong>
  <br>
  <br>
  <strong><em>Next Month Goals </em></strong>
  
  `;

  const onChange = (event, editor) => {
    const data = editor.getData();
    setMonth(data);
  };

  const onSubmit = () => {
    if (month) {
      saveMonth(month);
      console.log('hi', month);
      setMonth(monthTemplate);
      setisDone(true);
    }
  };

  const choseMonth = month => {
    setShowMonth(month.data);
  };

  return (
    <div>
      <h4 className='text-primary text-center mb-4'>Month Review</h4>
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
              Read Months Entries{' '}
            </button>
          </div>
          <br />
          {isDone === false ? (
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={monthTemplate}
                onChange={onChange}
                disabled={false}
              />
              <div className='clearfix my-4'>
                <button
                  className='float-right btn btn-primary w-25'
                  onClick={onSubmit}>
                  Save{' '}
                </button>
              </div>
            </div>
          ) : (
            <AlertSaved text={'Month'} />
          )}
        </div>
      ) : (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => setRoute(WRITE)}>
              Write Month Entry{' '}
            </button>
          </div>
          <br />
          {showMonth && (
            <CKEditor editor={ClassicEditor} data={showMonth} disabled={true} />
          )}
          <hr />
          <div className='mb-2'>
            {months !== null && months.length > 0 ? (
              months.map(month => (
                <button
                  className='btn btn-outline-primary mr-3'
                  key={month._id}
                  onClick={() => choseMonth(month)}>
                  {month.num}
                </button>
              ))
            ) : (
              <h3>No months saved</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthEditor;
