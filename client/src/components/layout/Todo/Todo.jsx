import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

import DossierContext from '../../../context/dossier/dossierContext';

const Todo = () => {
  //Ini context
  const dossierContext = useContext(DossierContext);
  const { taskUnDone, taskDone, addTask, deleteTask } = dossierContext;

  const todoList = JSON.parse(localStorage.getItem('todoList'));

  if (todoList === null) {
    return (
      <div>
        <h4 className='text-primary text-center'>Today's Tasks </h4>
        <AddTodo addTask={addTask} />
        <div className='border rounded mt-3 mb-4'>
          <h4>Add a task</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className='text-primary text-center'>Today's Tasks </h4>
      <AddTodo addTask={addTask} />
      <div className='border rounded mt-3 mb-4'>
        {todoList.length > 0 ? (
          todoList.length > 0 ? (
            todoList.map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
                taskDone={taskDone}
                taskUnDone={taskUnDone}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <h4>Loading</h4>
          )
        ) : (
          <h4>Add a task</h4>
        )}
      </div>
    </div>
  );
};

export default Todo;

/* {todoList.map(todo => (
  <TodoItem
    todo={todo}
    key={todo.id}
    taskDone={taskDone}
    taskUnDone={taskUnDone}
  />
))} */
