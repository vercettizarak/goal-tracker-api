import React, { useState } from 'react';

const AddGoal = ({ addGoal }) => {
  const [goal, setGoal] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (goal) {
      console.log(goal);
      setGoal('');
      addGoal(goal);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control '
          value={goal}
          required
          onChange={e => setGoal(e.currentTarget.value)}
        />
      </form>
    </div>
  );
};

export default AddGoal;
