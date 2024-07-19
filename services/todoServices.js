const mongoose = require('mongoose');
const todoTemplate = require('../models/todos');
const userTemplate = require('../models/user');
const { json } = require('express');



const createToDo = async (req, res) => {
    const { title, description, proposedPay, category, actualCost } = req.body;
    const { userName } = req.query;
    // console.log(req.body,{user:userName})

    if (!userName) {
        return res.status(400).json({ message: 'Username is required', success: false, code: 400 });
    }

    try {
        const userExist = await userTemplate.findOne({ userName });

        if (!userExist) {
            return res.status(401).json({ message: 'Unauthised user!', success: false, code: 401 });
        }

        const newTodo = new todoTemplate({
            title,
            description,
            proposedPay,
            category,
            actualCost,
            users: ['All'],
            username: userName
        });
        await newTodo.save()
        let createdTodo = {
            title,
            description,
            proposedPay,
            category,
            actualCost,
        }
        return res.status(200).json({ success: true, data: { payload: createdTodo }, status: 200, message: 'To do created' });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: 'Server error', msg: error.message, status: 500, success: false, status: 500 });
    }

};

const getUserTodos = async (req, res) => {
    const { username } = req.query;

    try {
        const userTodos = await todoTemplate.find({ username });
        const payload = userTodos.length ? userTodos : [];
        return res.status(200).json({
            data: { payload },
            success: true,
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: { payload: null },
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
}

const getTodoById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter

    try {
        const todo = await todoTemplate.findById(id);

        if (!todo) {
            return res.status(404).json({
                data: { payload: null },
                success: false,
                status: 404,
                error: 'Todo not found'
            });
        }

        return res.status(200).json({
            data: { payload: todo },
            success: true,
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: { payload: null },
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
};

const deleteTodoById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter

    try {
        const deletedTodo = await todoTemplate.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                data: { payload: null },
                success: false,
                status: 404,
                error: 'Todo not found'
            });
        }

        return res.status(200).json({
            data: { payload: deletedTodo },
            success: true,
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: { payload: null },
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
};

const editTodoById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter
    const updateData = req.body; // Assuming the updated data is in the request body

    try {
        const updatedTodo = await todoTemplate.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({
                data: { payload: null },
                success: false,
                status: 404,
                error: 'Todo not found'
            });
        }

        return res.status(200).json({
            data: { payload: updatedTodo },
            success: true,
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: { payload: null },
            success: false,
            status: 500,
            error: 'Server error'
        });
    }
};

const getAllTodos = async (req, res) => {
    try {
      const todos = await todoTemplate.find({});
  
      const payload = todos.length ? todos : [];
      return res.status(200).json({
        data: { payload },
        success: true,
        status: 200
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: { payload: null },
        success: false,
        status: 500,
        error: 'Server error'
      });
    }
  };

module.exports = { createToDo, getUserTodos,getTodoById,editTodoById,deleteTodoById };