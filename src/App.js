import React, { useState } from 'react';

const ToDo = ({ todo, index, editTodo, completeTodo, deleteTodo }) => {
  return (
    <div
      className='todo'
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      {todo.text}

      <div className='btn-group'>
        <button className='btn' onClick={() => completeTodo(index)}>
          {'\u2713'}
        </button>
        <button className='btn' onClick={() => editTodo(index)}>
          Edit
        </button>
        <button className='btn' onClick={() => deleteTodo(index)}>
          x
        </button>
      </div>
    </div>
  );
};

const ToDoEdit = ({ todo, index, editTodo, abortChange }) => {
  const [value, setValue] = useState(todo.text);
  return (
    <div className='todo'>
      <div className='todo-edit'>
        <input
          className='input'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>

        <div className='btn-group'>
          <button className='btn' onClick={() => editTodo(index, value)}>
            Save
          </button>
          <button className='btn' onClick={() => abortChange()}>
            x
          </button>
        </div>
      </div>
    </div>
  );
};

function ToDoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className='btn-form'>Add ToDo</button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Write Code', isCompleted: false },
    { text: 'Drink Coffee', isCompleted: false },
  ]);

  const [editedIndex, setEditedIndex] = useState(-1);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].isCompleted === false) {
      newTodos[index].isCompleted = true;
      setTodos(newTodos);
    } else {
      newTodos[index].isCompleted = false;
      setTodos(newTodos);
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const openTodoEdit = (index, todo) => {
    setEditedIndex(index);
  };

  const editTodo = (index, value) => {
    setEditedIndex(-1);
    const newTodos = [...todos];
    newTodos[index].text = value;
    setTodos(newTodos);
  };

  const abortChange = () => {
    setEditedIndex(-1);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => {
          if (index === editedIndex) {
            return (
              <ToDoEdit
                key={index}
                index={index}
                todo={todo}
                editTodo={editTodo}
                abortChange={abortChange}
              />
            );
          }
          return (
            <ToDo
              key={index}
              index={index}
              todo={todo}
              editTodo={openTodoEdit}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          );
        })}
        <ToDoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
