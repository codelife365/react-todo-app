import React from 'react'
import './style.css'

export default ({ id, todos, modifyTodo }) => (
  <li className="todo-item">
    <input id={id} type="checkbox" className="todo-checkbox" />
    <label htmlFor={id} />
    <div
      className="todo-content"
      contentEditable="true"
      suppressContentEditableWarning
      onKeyUp={e => e.which === 13 && modifyTodo(id, e)}
      onBlur={e => modifyTodo(id, e)}
    >
      {todos[id].text}
    </div>
    <div className="todo-delete" />
  </li>
)
