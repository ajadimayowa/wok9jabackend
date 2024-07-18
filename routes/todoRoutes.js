const express = require('express');
const { createToDo, getUserTodos, getAllTodos } = require('../services/todoServices');
const protectedRoute = require('../src/middleware/authMiddleWae');

const router = express.Router();

router.post('/create-todo', protectedRoute, createToDo);
router.get('/user-todos', protectedRoute, getUserTodos);
router.get('/all-todos',protectedRoute, getAllTodos);
router.delete('/delete-todo/:userName',protectedRoute, getAllTodos);
router.delete('/update-todo',protectedRoute, getAllTodos);

module.exports = router;