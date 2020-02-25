import React from 'react';
import '../styles/button.scss';
import './TodoFooter.scss';

import filterTypes from '../filterTypes';

function TodoFooter (props) {
  const {
    isAllDone,
    toggleAllItems,
    filterType,
    updateFilter,
    deleteCheckedItems
  } = props;

  return (
    <div className="todo__footer">
      <div className="todo__footer__panel">
        <div className="todo__footer__item">
          <button
            className={isAllDone ? 'toggle--active' : 'toggle'}
            style={{
              display: filterType === filterTypes.ALL_ITEM
                ? 'block'
                : 'none'
            }}
            onClick={toggleAllItems}
          ></button>
        </div>
        <div className="todo__footer__item">
          <button
            className={
              filterType === filterTypes.ALL_ITEM
                ? 'button--active'
                : 'button'
            }
            onClick={() => updateFilter(filterTypes.ALL_ITEM)}
          >All</button>
        </div>
        <div className="todo__footer__item">
          <button
            className={
              filterType === filterTypes.DONE_ITEM
                ? 'button--active'
                : 'button'
            }
            onClick={() => updateFilter(filterTypes.DONE_ITEM)}
          >Done</button>
        </div>
        <div className="todo__footer__item">
          <button
            className={
              filterType === filterTypes.PENDING_ITEM
                ? 'button--active'
                : 'button'
            }
            onClick={() => updateFilter(filterTypes.PENDING_ITEM)}
          >Pending</button>
        </div>
        <div className="todo__footer__item">
          <button
            className="button red"
            onClick={deleteCheckedItems}
          >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TodoFooter;
