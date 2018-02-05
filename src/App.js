import React, { Component } from 'react'
import './App.css'
import shortid from 'shortid'

class App extends Component {
  state = {
    todos: [{ id: shortid.generate(), text: 'first task' }]
  }

  addTodo = () => {
    const text = this.input.value.trim()
    if (!text) return

    this.setState(prevState => ({
      todos: [...prevState.todos, { id: shortid.generate(), text }]
    }))
    this.input.value = ''
  }

  render() {
    console.log(this.state)
    const { todos } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Todo App</h1>
        </header>
        <main className="App-content">
          <input type="text" ref={input => (this.input = input)} />
          <button onClick={this.addTodo}>add</button>
          <ul className="status">
            <li>
              <a href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <ul className="todos">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <div className="todo-content">{todo.text}</div>
                <div className="todo-operation">
                  <button>done</button>
                  <button>modify</button>
                  <button>del</button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    )
  }
}

export default App
