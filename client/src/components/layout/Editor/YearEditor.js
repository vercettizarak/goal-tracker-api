import React, { useState, useContext, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DossierContext from '../../../context/dossier/dossierContext';
import { WRITE, READ } from './types';
import AlertSaved from '../Alert/AlertSaved';

const YearEditor = () => {
  //init Context and extract function
  const dossierContext = useContext(DossierContext);
  const {
    saveYear,
    entries: { years },
    getYears,
    getStatus,
    status,
  } = dossierContext;

  const [showYear, setShowYear] = useState(null);
  const [year, setYear] = useState();
  const [route, setRoute] = useState(WRITE);
  const [isDone, setisDone] = useState(false);
  let actual;

  useEffect(() => {
    getYears();
    getStatus();
    // eslint-disable-next-line
  }, []);

  if (status) {
    actual = status.year + 1;
  }

  const yearTemplate = `
  <h3>Year ${actual} , Date: ${new Date().getMonth() + 1}/
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
  <h4>Year Evaluation:</h4>
  <strong><em>Goal Accomplished:</em></strong>
  <br>
  <br>
  <strong><em>Goal Missed:</em></strong>
  <p>
  <h4>Next Year:</h4>
  <strong><em>Next Year Plan:</em></strong>
  <br>
  <br>
  <strong><em>Next Year Goals </em></strong>
  
  `;

  const onChange = (event, editor) => {
    const data = editor.getData();
    setYear(data);
  };

  const onSubmit = () => {
    if (year) {
      saveYear(year);
      console.log('hi', year);
      setYear(yearTemplate);
      setisDone(true);
    }
  };

  const choseYear = year => {
    setShowYear(year.data);
  };

  return (
    <div>
      <h4 className='text-primary text-center mb-4'>Year Review</h4>
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
              Read Years Entries{' '}
            </button>
          </div>
          <br />
          {isDone === false ? (
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={yearTemplate}
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
            <AlertSaved text={'Year'} />
          )}
        </div>
      ) : (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => setRoute(WRITE)}>
              Write Year Entry{' '}
            </button>
          </div>
          <br />
          {showYear && (
            <CKEditor editor={ClassicEditor} data={showYear} disabled={true} />
          )}
          <hr />
          <div className='mb-2'>
            {years !== null && years.length > 0 ? (
              years.map(year => (
                <button
                  className='btn btn-outline-primary mr-3'
                  key={year._id}
                  onClick={() => choseYear(year)}>
                  {year.num}
                </button>
              ))
            ) : (
              <h3>No years saved</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearEditor;
