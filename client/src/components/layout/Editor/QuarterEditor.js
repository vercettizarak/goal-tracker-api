import React, { useState, useContext, useEffect } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DossierContext from '../../../context/dossier/dossierContext';
import { WRITE, READ } from './types';
import AlertSaved from '../Alert/AlertSaved';

const QuarterEditor = () => {
  //init Context and extract function
  const dossierContext = useContext(DossierContext);
  const {
    saveQuarter,
    entries: { quarters },
    getQuarters,
    getStatus,
    status,
  } = dossierContext;

  const [showQuarter, setShowQuarter] = useState(null);
  const [quarter, setQuarter] = useState();
  const [route, setRoute] = useState(WRITE);
  const [isDone, setisDone] = useState(false);
  let actual;

  useEffect(() => {
    getQuarters();
    getStatus();
    // eslint-disable-next-line
  }, []);

  if (status) {
    actual = status.quarter + 1;
  }

  const quarterTemplate = `
  <h3>Quarter ${actual} , Date: ${new Date().getMonth() + 1}/
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
  <h4>Quarter Evaluation:</h4>
  <strong><em>Goal Accomplished:</em></strong>
  <br>
  <br>
  <strong><em>Goal Missed:</em></strong>
  <p>
  <h4>Next Quarter:</h4>
  <strong><em>Next Quarter Plan:</em></strong>
  <br>
  <br>
  <strong><em>Next Quarter Goals </em></strong>
  
  `;

  const onChange = (event, editor) => {
    const data = editor.getData();
    setQuarter(data);
  };

  const onSubmit = () => {
    if (quarter) {
      saveQuarter(quarter);
      console.log('hi', quarter);
      setQuarter(quarterTemplate);
      setisDone(true);
    }
  };

  const choseQuarter = quarter => {
    setShowQuarter(quarter.data);
  };

  return (
    <div>
      <h4 className='text-primary text-center mb-4'>Quarter Review</h4>
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
              Read Quarters Entries{' '}
            </button>
          </div>
          <br />
          {isDone === false ? (
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={quarterTemplate}
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
            <AlertSaved text={'Quarter'} />
          )}
        </div>
      ) : (
        <div>
          <div className='clearfix'>
            <button
              className='float-right btn btn-outline-success w-25'
              onClick={() => setRoute(WRITE)}>
              Write Quarter Entry{' '}
            </button>
          </div>
          <br />
          {showQuarter && (
            <CKEditor
              editor={ClassicEditor}
              data={showQuarter}
              disabled={true}
            />
          )}
          <hr />
          <div className='mb-2'>
            {quarters !== null && quarters.length > 0 ? (
              quarters.map(quarter => (
                <button
                  className='btn btn-outline-primary mr-3'
                  key={quarter._id}
                  onClick={() => choseQuarter(quarter)}>
                  {quarter.num}
                </button>
              ))
            ) : (
              <h3>No Quater saved</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuarterEditor;
