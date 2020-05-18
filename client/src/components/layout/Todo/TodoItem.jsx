import React from 'react';

const TodoItem = ({
  todo: { id, startTime, endTime, task, isDone },
  taskDone,
  taskUnDone,
  deleteTask,
}) => {
  if (isDone === false) {
    return (
      <div className='p-2 d-flex  i-pointer'>
        <i className='far fa-square mr-4 pt-1' onClick={() => taskDone(id)}></i>
        <h6 className='d-inline-block mr-4'>{`${startTime} - ${endTime}`}</h6>
        <h6 className='d-inline-block'>{task}</h6>
        <i
          className='far fa-trash-alt text-danger ml-auto'
          onClick={() => deleteTask(id)}></i>
      </div>
    );
  }
  return (
    <div className='p-2 d-flex justify-content-between i-pointer text-muted'>
      <i className='fas fa-check mr-4 pt-1' onClick={() => taskUnDone(id)}></i>
      <h6 className='d-inline-block mr-4'>{`${startTime} - ${endTime}`}</h6>
      <h6 className='d-inline-block'>{task}</h6>
      <i
        className='far fa-trash-alt text-danger  ml-auto'
        onClick={() => deleteTask(task.id)}></i>
    </div>
  );
};

export default TodoItem;
