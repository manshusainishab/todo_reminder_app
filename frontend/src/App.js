import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
    return (
        <div>
            <h1>To-Do Reminder App</h1>
            <TodoForm />
            <TodoList />
        </div>
    );
}

export default App;
