import React, { useState } from 'react';
import './App.scss';

import TodoStorage from './TodoStorage'
import TodoHeader from './components/TodoHeader';
import TodoItem from './components/TodoItem';
import TodoFooter from './components/TodoFooter';
import filterTypes from './filterTypes';

function App () {
  const todoStorage = new TodoStorage('react-todo_v1');
  const [ todos, setTodos ] = useState(todoStorage.select());
  const [ currentFilter, setFilter ] = useState(filterTypes.ALL_ITEM);

  const isAllDone = () => {
    return !!todos.length && todos.every(t => t.done);
  };

  const renderFilteredTodo = () => {
    let filteredTodo;
    switch (currentFilter) {
      case filterTypes.ALL_ITEM:
        filteredTodo = todos;
        break;

      case filterTypes.DONE_ITEM:
        filteredTodo = todos.filter(todo => todo.done);
        break;

      case filterTypes.PENDING_ITEM:
        filteredTodo = todos.filter(todo => !todo.done);
        break;

      default:
        filteredTodo = todos;
    }

    return (
      filteredTodo.length === 0 ? (
        <div className="todo--empty">To-Do Item is empty..</div>
      ) : (
        filteredTodo.map(todo => (
          <TodoItem
            id={todo.id}
            message={todo.message}
            done={todo.done}
            key={todo.id}
            update={updateTodoItem}
            delete={deleteTodoItem}
          />
        ))
      )
    );
  };

  const getTodoItem = () => {
    setTodos(todoStorage.select());
  };

  const addTodoItem = ({ message }) => {
    todoStorage.insert(message);
    getTodoItem();
  };

  const updateTodoItem = ({ id, message, done }) => {
    todoStorage.update(id, message, done);
    getTodoItem();
  };

  const deleteTodoItem = ({ id }) => {
    todoStorage.delete(id);
    getTodoItem();
  };

  const toggleAllItems = () => {
    const done = !isAllDone()
    todos.forEach(todo => {
      todoStorage.update(todo.id, todo.message, done);
      getTodoItem();
    })
  };

  const updateFilter = (type) => {
    setFilter(type);
  };

  const deleteCheckedItems = () => {
    if (!window.confirm('Are you sure?')) {
      return
    }

    todos
      .filter(todo => todo.done)
      .forEach(todo => {
        todoStorage.delete(todo.id)
        getTodoItem()
      })
  }

  return (
    <div className="app">
      <TodoHeader
        addTodoItem={addTodoItem}
      />
      <div className="todo">
        {renderFilteredTodo()}
      </div>
      <TodoFooter
        isAllDone={isAllDone()}
        toggleAllItems={toggleAllItems}
        filterType={currentFilter}
        updateFilter={updateFilter}
        deleteCheckedItems={deleteCheckedItems}
      />
      <div className="source-code">
        <h6>Using React</h6>
        <a href="https://github.com/leegeunhyeok/react-todo">Source Code</a>
      </div>
      <div className="checkout">
        <a className="react active"
          href="https://docs.geundung.dev/pages/react-todo"
        >React</a>
        <a className="vue"
          href="https://docs.geundung.dev/pages/vue-todo"
        >Vue</a>
        <a className="angular" href="./?">Angluar</a>
      </div>
    </div>
  );
}

export default App;
