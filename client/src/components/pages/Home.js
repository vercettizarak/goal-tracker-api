import React from 'react';
import WeeklyGoals from '../layout/WeeklyGoals/WeeklyGoals';
import Todo from '../layout/Todo/Todo';
import Sidebar from '../layout/Sidebar/Sidebar';
import Mission from '../layout/Mission/Mission';

const Home = () => {
  return (
    <div>
      <Mission />
      <div className='container text-center'>
        <div className='row'>
          <div className='col-md-3 mt-5 mb-4'>
            {' '}
            <Sidebar />
          </div>
          <div className='col-md-6'>
            <Todo />
          </div>
          <div className='col-md-3 my-5'>
            <WeeklyGoals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
