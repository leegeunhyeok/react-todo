import React, { useState } from 'react';
import '../styles/button.scss';
import './TodoHeader.scss';

function TodoHeader (props) {
  const [ message, setMessage ] = useState('')

  const submit = () => {
    if (!message) {
      alert('To-Do item cannot be empty')
      return
    }
    props.addTodoItem({ message })
    setMessage('')
  }

  const submitKeyDown = (e) => {
    if (e.keyCode === 13) {
      submit();
    }
  }

  return (
    <div className="todo__header">
      <input placeholder="To-Do item.."
        onChange={e => setMessage(e.target.value)}
        onKeyDown={submitKeyDown}
        value={message}
      />
      <button className="button accent" onClick={submit}>Add</button>
    </div>
  );
}

export default TodoHeader;
