import React from 'react'
import './style.css'
import order from './order.svg'

export default ({ id, todo, modifyTodo, doneTodo, deleteTodo }) => (
  <li className="todo-item">
    {!todo.done && (
      <img
        src={order}
        alt="order"
        height="24px"
        className="todo-move"
        style={{ cursor: 'move' }}
      />
    )}
    <input
      id={id}
      type="checkbox"
      className="todo-checkbox"
      defaultChecked={todo.done}
    />
    <label htmlFor={id} onClick={() => doneTodo(id)} />
    <div
      style={todo.done ? { textDecoration: 'line-through', color: '#999' } : {}}
      className="todo-content"
      contentEditable="true"
      suppressContentEditableWarning
      onKeyUp={e => e.which === 13 && modifyTodo(id, e)}
      onBlur={e => modifyTodo(id, e)}
    >
      {todo.text}
    </div>
    <div className="todo-delete" onClick={() => deleteTodo(id)} />
  </li>
)
