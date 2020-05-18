import React from 'react';

const Done = ({ goal, undoGoal, deleteGoal }) => {
  return (
    <div className='d-flex justify-content-between i-pointer'>
      <h6 className='text-left d-inline mr-auto'>
        <i
          className='fas fa-check text-muted'
          onClick={() => undoGoal(goal.id)}
        ></i>{' '}
        {goal.task}{' '}
      </h6>
      <i className='far fa-trash-alt' onClick={() => deleteGoal(goal.id)}></i>
    </div>
  );
};

export default Done;
