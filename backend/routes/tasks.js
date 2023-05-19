const express = require('express');
const { 
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskController');

const router = express.Router(); // create a router object

// get all tasks
router.get('/', getAllTasks);

// get a single task
router.get('/:id', getTask);

// create a task
router.post('/', createTask);

// delete a task
router.delete('/:id', deleteTask);

// update a task
router.patch('/:id', updateTask);

module.exports = router; // export the router object
