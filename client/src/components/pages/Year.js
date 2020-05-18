import React from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import YearEditor from '../layout/Editor/YearEditor';
import Mission from '../layout/Mission/Mission';

const Year = () => {
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
            <YearEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Year;
