const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.DB


app.use(cors());
app.use(express.json());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
