import React from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';
import QuarterEditor from '../layout/Editor/QuarterEditor';
import Mission from '../layout/Mission/Mission';

const Quarter = () => {
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
            <QuarterEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quarter;
