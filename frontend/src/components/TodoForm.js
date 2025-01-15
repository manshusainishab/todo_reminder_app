import React, { useState } from 'react';
import axios from 'axios';

function TodoForm({ refreshTodos }) {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task) return;

        try {
            await axios.post('https://todo-reminder-app-uffc.onrender.com/api/todos/add', { task });
            setTask('');
            refreshTodos();
        } catch (err) {
            console.error('Error adding task', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TodoForm;
