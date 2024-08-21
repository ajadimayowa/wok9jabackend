const express = require('express');
const {updateUser} = require('../contollers/userController');
const authenticateUser = require('../../middleware/authMiddleWae')

const router = express.Router();

router.post('update-user',authenticateUser,updateUser);

module.exports = router