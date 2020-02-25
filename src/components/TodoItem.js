import React, { useState } from 'react';
import '../styles/button.scss';
import './TodoItem.scss';

function TodoItem (props) {
  const { id, message, done } = props;
  const [ mutableMessage, setMessage ] = useState(message);
  const [ editing, setEditState ] = useState(false);
  
  const updateDoneState = () => {
    props.update({ id, message, done: !done });
  }

  const updateMessage = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setEditState(false);
      props.update({ id, message: mutableMessage, done });
    }
  }

  return (
    <div className="todo__item">
      <div className="todo__item__control--left">
        <button
          className={done ? 'toggle--active' : 'toggle'}
          onClick={updateDoneState}
        >
        </button>
      </div>
      {
        editing ? (
          <input className="todo__item__edit"
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.keyCode === 13 && updateMessage()}
            onBlur={updateMessage}
            value={mutableMessage}
          />
        ) : (
          <b
            style={{textDecoration: done ? 'line-through' : 'none'}}
            onClick={() => setEditState(true)}
          >{mutableMessage}</b>
        )
      }
      <div className="todo__item__control--right">
        <button
          className="button red"
          onClick={() => props.delete({ id })}
        >
          X
        </button>
      </div>
    </div>
  )
}

export default TodoItem;
