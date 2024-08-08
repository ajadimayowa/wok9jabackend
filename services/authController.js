const mongoose = require('mongoose');
const userTemplate = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGen = require('../src/utils/utils')



const loginUser = async (req, res) => {
    console.log({requestFrom :req.body, userOtp: otpGen()});
    const jwtSecret = process.env.JWT_SECRET
    const { email, password,userName } = req.body;

    try {
        const user = await userTemplate.findOne({$or:[{email},{userName}] });
        if (!user) {
            return res.status(409).json({ message: 'Invalid credentials',success:false, status : 409 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials', success:false, status : 400 });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json(
                {
                    data: {
                        payload: {
                            userName: user.userName,
                            email: user.email,
                            fullName: user.fullName
                        },
                       userToken : token
                    },
                    status: 200,
                    success : true,
                    message: 'Login Succesful!'
                }
            );
        });

    } catch (error) {
        // console.error(error.message);
        res.status(500).send({payload:{message:'Server error',success:false, status:500}});
    }
};

module.exports = { loginUser };