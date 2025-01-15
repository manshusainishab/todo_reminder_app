const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Add a new To-Do Task
router.post('/add', async (req, res) => {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: 'Error adding task' });
    }
});

// Display list of To-Do Tasks
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Edit a To-Do Task
router.put('/edit/:id', async (req, res) => {
    const { task, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { task, completed },
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete a To-Do Task
router.delete('/delete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

// Delete all To-Do Tasks
router.delete('/deleteAll', async (req, res) => {
    try {
        await Todo.deleteMany();
        res.status(200).json({ message: 'All tasks deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting tasks' });
    }
});

module.exports = router;
