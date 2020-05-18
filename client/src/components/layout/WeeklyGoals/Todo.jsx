import React from 'react';

const Todo = ({ goal, goalDone, deleteGoal }) => {
  return (
    <div className='d-flex justify-content-between i-pointer'>
      <h6 className='text-left d-inline mr-auto'>
        <i className='far fa-square' onClick={() => goalDone(goal.id)}></i>{' '}
        {goal.task}{' '}
      </h6>
      <i
        className='far fa-trash-alt text-danger'
        onClick={() => deleteGoal(goal.id)}
      ></i>
    </div>
  );
};

export default Todo;
