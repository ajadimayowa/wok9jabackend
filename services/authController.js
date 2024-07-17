const mongoose = require('mongoose');
const userTemplate = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const loginUser = async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET
    const { email, password,userName } = req.body;

    try {
        const user = await userTemplate.findOne({$or:[{email},{userName}] });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials',success:false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials', success:false });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json(
                {
                    payload: {
                        data: {
                            userName: user.userName,
                            email: user.email,
                            fullName: user.fullName
                        },
                        success: true,
                        userToken: token,
                    },
                    status: 200,
                    message: 'Login Succesfull!'
                }
            );
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({payload:{message:'Server error',success:false, status:500}});
    }
};

module.exports = { loginUser };