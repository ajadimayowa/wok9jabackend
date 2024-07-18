const mongoose = require('mongoose');
const todoTemplate = require('../models/todos');
const userTemplate = require('../models/user');
const { json } = require('express');



const createToDo = async (req, res) => {
    const { title, description, proposedPay, category, actualCost, usersEmail } = req.body;
    const { userName } = req.query;

    if (!userName) {
        return res.status(400).json({ message: 'Username is required', success: false });
    }

    try {
        const userExist = await userTemplate.findOne({ userName });

        if (!userExist) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const newTodo = new todoTemplate({
            title,
            description,
            proposedPay,
            category: 'General',
            actualCost,
            usersEmail,
            userName
        });
        const savedTodo = await newTodo.save();

        return res.status(201).json({ success: true, data: { payload: savedTodo } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

};

const getUserTodos = async (req, res) => {
    const { userName } = req.query;

    try {
        const userTodos = await todoTemplate.find({ userName });

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

const getAllTodos = async (req, res) => {

}

module.exports = { createToDo, getUserTodos, getAllTodos };