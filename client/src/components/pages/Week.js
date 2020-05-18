import React from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import WeekEditor from '../layout/Editor/WeekEditor';
import Mission from '../layout/Mission/Mission';

const Week = () => {
  return (
    <div>
      <Mission />
      <div className='container '>
        <div className='row'>
          <div className='col-md-3 text-center mt-5 mb-4'>
            {' '}
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <WeekEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;
