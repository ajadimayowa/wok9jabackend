const express = require('express');
const { createToDo, getUserTodos, getTodoById, editTodoById, deleteTodoById } = require('../services/todoServices');
const protectedRoute = require('../src/middleware/authMiddleWae');

const router = express.Router();

router.post('/create-todo', protectedRoute, createToDo);
router.get('/user-todos', protectedRoute, getUserTodos);
router.get('/todo:id', protectedRoute, getTodoById);
router.delete('/delete-todo/:id', protectedRoute, deleteTodoById);
router.patch('/update-todo/:id', editTodoById)

module.exports = router;