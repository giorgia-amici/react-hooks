import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className='app-todo--item' style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}> 
        { todo.text } 
        <div>
            <button className='todo-item--complete' onClick={() => completeTodo(index)}>&#10003;</button>
            <button className='todo-item--remove' onClick={() => removeTodo(index)}>x</button>
        </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
    //array destructuring syntax below 
    //you have to pass an argument to useState which will be set as the original state
    //for the first render. 
    const [value, setValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        //do not submit if empty string
        if (!value) return;
        addTodo(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className='app-todo--form'>
            <input
                type='text'
                className='input'
                value={value}
                placeholder='New todo...'
                onChange={e => setValue(e.target.value)}
            />
        </form>
    )
}

function App() {

    //array destructuring syntax below <3
    const [todos, setTodos] = useState([
        {text: 'Book Gym', isCompleted: false},
        {text: 'Update Calendar', isCompleted: false}
    ]);

    const addTodo = text => {
        //use the spread operator to copy the content of the current todo list
        const newTodos = [...todos, {text}];
        setTodos(newTodos);    
    }

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;

        setTodos(newTodos);
    } 

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);

        setTodos(newTodos);
    }

    return (
        <div className='app'>
            <header className='app-header'></header>
            <p>You have {todos.length} todos in your list</p>
            <section className='app-todo'>
                {todos.map((todo, index) => (
                    <Todo 
                        key={index} 
                        todo={todo}
                        index={index} 
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
            <TodoForm addTodo={addTodo} />
            </section>
        </div>
    );
}

export default App;
  