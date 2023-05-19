require('dotenv').config();

const express = require('express');
const tasksRoutes = require('./routes/tasks');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const app = express();

// global middleware
app.use(express.json()); // parse json data

app.use((req, res, next) => {
    console.log(req.path, req.method);  // log the path and method to the console
    next(); // pass control to the next middleware function
})

//routes
app.use('/api/tasks', tasksRoutes);

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // start the server; listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {console.log(error) });



// Start the server


