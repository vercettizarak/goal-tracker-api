import React from 'react';
import MonthEditor from '../layout/Editor/MonthEditor';
import Sidebar from '../layout/Sidebar/Sidebar';
import Mission from '../layout/Mission/Mission';

const Month = () => {
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
            <MonthEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Month;
