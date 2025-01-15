import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [editTask, setEditTask] = useState('');
    const [editId, setEditId] = useState(null);

    // Fetch the list of todos
    const refreshTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/todos');
            setTodos(response.data);
        } catch (err) {
            console.error('Error fetching tasks', err);
        }
    };

    // Handle task delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/todos/delete/${id}`);
            refreshTodos();
        } catch (err) {
            console.error('Error deleting task', err);
        }
    };

    // Handle delete all tasks
    const handleDeleteAll = async () => {
        try {
            await axios.delete('http://localhost:5001/api/todos/deleteAll');
            refreshTodos();
        } catch (err) {
            console.error('Error deleting all tasks', err);
        }
    };

    // Handle task edit
    const handleEdit = async (id) => {
        if (editTask.trim()) {
            try {
                await axios.put(`http://localhost:5001/api/todos/edit/${id}`, { task: editTask });
                setEditTask('');
                setEditId(null);
                refreshTodos();
            } catch (err) {
                console.error('Error editing task', err);
            }
        }
    };

    // Set the task to edit mode
    const handleEditClick = (task, id) => {
        setEditTask(task);
        setEditId(id);
    };

    useEffect(() => {
        refreshTodos();
    }, [todos]);

    return (
        <div>
            <h2>Todo List</h2>
            <button onClick={handleDeleteAll}>Delete All Tasks</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        {editId === todo._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                />
                                <button onClick={() => handleEdit(todo._id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {todo.task}{' '}
                                <button onClick={() => handleEditClick(todo.task, todo._id)}>Edit</button>
                                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
