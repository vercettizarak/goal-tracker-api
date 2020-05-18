import React, { useState } from 'react';

const AddTodo = ({ addTask }) => {
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('06:00');
  const [task, setTask] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (task.length > 0) {
      addTask({ startTime, endTime, task });
      setTask('');
      setStartTime(endTime);
      setEndTime('');
    } else {
      alert('Please add a task');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className='form-group row'>
          <div className='input-group timepicker col-sm-5'>
            <input
              type='time'
              className='form-control w-25'
              value={startTime}
              required
              onChange={e => setStartTime(e.currentTarget.value)}
            />
            <input
              type='time'
              className='form-control w-25'
              value={endTime}
              required
              onChange={e => setEndTime(e.currentTarget.value)}
            />
          </div>
          <div className='col-sm-7'>
            <div className='input-group mb-3'>
              <input
                className='form-control'
                type='text'
                id='name'
                placeholder='Enter task'
                value={task}
                onChange={e => setTask(e.currentTarget.value)}
              />
              <div className='input-group-apend'>
                <span className='input-group-text i-pointer' onClick={onSubmit}>
                  <i className='fas fa-plus p-1'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
