const express = require('express');
const authMiddleware = require('../../middleware/authMiddleWae');

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Unauthorised resource access', user: req.user });
});

module.exports = router;