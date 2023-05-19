const mongoose = require('mongoose')

// function to create schema
const Schema = mongoose.Schema

// create a schema for tasks
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// create a model for tasks
// the modesl applies the schema and lets us interact with the database

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
