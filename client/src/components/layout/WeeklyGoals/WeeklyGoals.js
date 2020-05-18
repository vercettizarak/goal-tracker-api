import React, { useContext } from 'react';
import DossierContext from '../../../context/dossier/dossierContext';

//Import Components
import Todo from './Todo';
import Done from './Done';
import AddGoal from './AddGoal';

const WeeklyGoals = () => {
  const dossierContext = useContext(DossierContext);
  const { goalDone, undoGoal, deleteGoal, addGoal } = dossierContext;
  const unfinished = JSON.parse(localStorage.getItem('unfinished')) || [];
  const finished = JSON.parse(localStorage.getItem('finished')) || [];

  return (
    <div>
      <div className='card border-primary mb-3'>
        <div className='card-header'>
          <h5 className='text-primary'>Goals to Achieve</h5>
        </div>
        <div className='p-1'>
          <AddGoal addGoal={addGoal} />
        </div>

        <div className='card-body'>
          {unfinished.length > 0 ? (
            unfinished.map(goal => (
              <Todo
                goal={goal}
                goalDone={goalDone}
                deleteGoal={deleteGoal}
                key={goal.id}
              />
            ))
          ) : (
            <h4>Add a Goal</h4>
          )}
        </div>
      </div>

      <div className='card border-secondary mb-3'>
        <div className='card-header'>
          <h5 className='text-secondary'>Goals Achieved</h5>
        </div>
        <div className='card-body text-secondary'>
          {finished.length > 0 ? (
            finished.map(goal => (
              <Done
                goal={goal}
                undoGoal={undoGoal}
                deleteGoal={deleteGoal}
                key={goal.id}
              />
            ))
          ) : (
            <h4>Complete a goal</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoals;
