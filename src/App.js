import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index, completeTodo }) {
  return (
    <div className='app-todo--item' style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}> 
        { todo.text } 
        <div>
            <button onClick={() => completeTodo(index)}>Complete</button>
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
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='input'
                value={value}
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

    return (
        <div className='app'>
            <header className='app-header'></header>
            <section className='app-todo'>
                {todos.map((todo, index) => (
                    <Todo 
                        key={index} 
                        todo={todo}
                        index={index} 
                        completeTodo={completeTodo}
                    />
                ))}
            </section>
            <TodoForm addTodo={addTodo} />
        </div>
    );
}

export default App;
  