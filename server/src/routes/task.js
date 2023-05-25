const express = require('express');
const router = express.Router();
const connectDataBase = require('../middlewares/connectionDB');
const jwt = require('jsonwebtoken');
const authUser = require('../middlewares/authUser');
const TaskSchema = require('../models/taskModel');

// create task
router.post('/create', authUser, connectDataBase, async (req, res) => {
    try {
        let { position, title, description, status, deliveryDate } = req.body;
        const userCreator = req.userJwt.id;
        const responseDB = await TaskSchema.create({ position, title, description, status, deliveryDate, userCreator });

        res.status(200).json({
            status: 'success',
            statusMessage: 'Task created successfully',
            response: responseDB
        })
    } catch (error) {
        throw new Error(error.message);
    }
})

// alter task
router.post('/edit/:id', authUser, connectDataBase, async (req, res) => {
    try {
        let idTask = req.params.id;
        let { position, title, description, status, deliveryDate } = req.body;
        const userLoggedIn = req.userJwt.id;

        const checkTask = await TaskSchema.findOne({ _id: idTask, userCreator: userLoggedIn });

        if(!checkTask){
            throw new Error('Task not found or belongs to another user.')
        }

        const updatedTask = await TaskSchema.updateOne({ _id: idTask }, { position, title, description, status, deliveryDate });
        if(updatedTask?.modifiedCount>0){ // verifies if the task register was altered
            const dataTask = await TaskSchema.findOne({ _id: idTask}).populate('userCreator'); // searches for the new updated task
        }

        res.status(200).json({
            status: 'success',
            statusMessage: 'Task created successfully',
            response: dataTask
        })
    } catch (error) {
        throw new Error(error.message);
    }
})


// delete task
router.post('/create', authUser, connectDataBase, async (req, res) => {
    try {
        let { position, title, description, status, deliveryDate } = req.body;
        const userCreator = req.userJwt.id;
        const responseDB = await TaskSchema.create({ position, title, description, status, deliveryDate, userCreator });

        res.status(200).json({
            status: 'success',
            statusMessage: 'Task created successfully',
            response: responseDB
        })
    } catch (error) {
        throw new Error(error.message);
    }
})

// alter task
router.delete('/edit/:id', authUser, connectDataBase, async (req, res) => {
    try {
        let idTask = req.params.id;
        const userLoggedIn = req.userJwt.id;

        const checkTask = await TaskSchema.findOne({ _id: idTask, userCreator: userLoggedIn });

        if(!checkTask){
            throw new Error('Task not found or belongs to another user.')
        }

        const responseDB = await TaskSchema.deleteOne({ _id: idTask });

        res.status(200).json({
            status: 'success',
            statusMessage: 'Task deleted successfully',
            response: responseDB
        })
    } catch (error) {
        throw new Error(error.message);
    }
})



module.exports = router;