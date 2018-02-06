import React, { Component } from 'react'
import './App.css'
import shortid from 'shortid'
import TodoItem from './components/TodoItem'
import Sortable from 'sortablejs'

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

  deleteTodo = id => {
    this.setState(prevState => {
      // 对象 通过 key 过滤 剩余值
      const { [id]: todoDelete, ...todos } = prevState.todos
      return {
        ids: prevState.ids.filter(prev_id => prev_id !== id),
        todos
      }
    })
  }

  doneTodo = id => {
    this.setState(({ todos }) => {
      return {
        todos: {
          ...todos,
          [id]: { text: todos[id].text, done: !todos[id].done }
        }
      }
    })
  }

  componentDidMount() {
    Sortable.create(this.todoList, {
      handle: '.todo-move',
      animation: 150,
      onUpdate: e => {
        const { oldIndex, newIndex } = e
        const newIds = [...this.state.ids]
        const movedId = newIds.splice(oldIndex, 1)[0]
        newIds.splice(newIndex, 0, movedId)
        this.setState({ ids: newIds })
      }
    })
  }

  render() {
    console.log(this.state)
    const { ids, todos } = this.state
    let active_ids = []
    let completed_ids = []
    ids.forEach(id => {
      todos[id].done ? completed_ids.push(id) : active_ids.push(id)
    })

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
          <a href="#/">All</a>
          <a href="#/trash">trash</a>

          <ul ref={el => (this.todoList = el)}>
            {active_ids.map(id => (
              <TodoItem
                key={id}
                id={id}
                todo={todos[id]}
                modifyTodo={this.modifyTodo}
                deleteTodo={this.deleteTodo}
                doneTodo={this.doneTodo}
              />
            ))}
          </ul>

          <hr />

          <h6>{completed_ids.length} Completed items</h6>

          <ul>
            {completed_ids.map(id => (
              <TodoItem
                key={id}
                id={id}
                todo={todos[id]}
                modifyTodo={this.modifyTodo}
                deleteTodo={this.deleteTodo}
                doneTodo={this.doneTodo}
              />
            ))}
          </ul>
        </main>
      </div>
    )
  }
}

export default App
