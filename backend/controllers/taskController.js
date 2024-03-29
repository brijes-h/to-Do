const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// get all tasks
const getAllTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})
    res.status(200).json(tasks)
}

// get a single task
const getTask = async (req, res) => {
    const { id } = req.params

    // checking if the id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No task with id: ${id}`})
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: `No task with id: ${id}`})
    }

    res.status(200).json({task})
}

// create a task
const createTask = async (req, res) => {
    const { title, completed } = req.body
    // add document to database
    try {
        const newTask = await Task.create({title, completed})
        res.status(200).json(newTask)
    } catch (error) {  
        res.status(400).json({error: error.message})
    }
}

// delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No task with id: ${id}`})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task) {
        return res.status(404).json({error: `No task with id: ${id}`})
    }

    res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No task with id: ${id}`})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!task) {
        return res.status(404).json({error: `No task with id: ${id}`})
    }

    res.status(200).json(task)
}



//export functions
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}