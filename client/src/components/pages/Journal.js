import React from 'react';
import JournalEditor from '../layout/Editor/JornalEditor';
import Sidebar from '../layout/Sidebar/Sidebar';
import Mission from '../layout/Mission/Mission';

const Journal = () => {
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
            <JournalEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
