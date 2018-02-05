import React, { Component } from 'react'
import './App.css'
import shortid from 'shortid'
import TodoItem from './components/TodoItem'

class App extends Component {
  constructor(props) {
    super(props)
    const id = shortid.generate()
    this.state = {
      ids: [id],
      todos: {
        [id]: { text: 'first task', done: false }
      }
    }
  }

  addTodo = () => {
    const text = this.input.value.trim()
    if (!text) return

    const id = shortid.generate()
    this.setState(prevState => ({
      ids: [...prevState.ids, id],
      todos: { ...prevState.todos, [id]: { text, done: false } }
    }))
    this.input.value = ''
  }

  modifyTodo = (id, e) => {
    const text = e.target.innerText.trim()

    if (!text) return
    this.setState(prevState => ({
      todos: { ...prevState.todos, [id]: { text, done: false } }
    }))
  }

  render() {
    console.log(this.state)
    const { ids, todos } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Todo App</h1>
        </header>

        <main className="App-content">
          <input
            type="text"
            ref={input => (this.input = input)}
            onKeyUp={e => e.which === 13 && this.addTodo()}
          />
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
          <ul>
            {ids.map(id => (
              <TodoItem
                key={id}
                id={id}
                todos={todos}
                modifyTodo={this.modifyTodo}
              />
            ))}
          </ul>

          <hr />
          
          <h6>0 Completed items</h6>
        </main>
      </div>
    )
  }
}

export default App
