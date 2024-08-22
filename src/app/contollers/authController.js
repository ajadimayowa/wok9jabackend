const mongoose = require('mongoose');
const userTemplate = require('../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const loginUser = async (req, res) => {
    // console.log({requestFrom :req.body, userOtp: otpGen()});
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
                            userId:user.id,
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

const verifyOtp = async (req, res) => {

    const { email, otpCode } = req.body;
    console.log({userSent:{email:email,otpCode}})

    try {
        // Find the user by email
        const user = await userTemplate.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false, status: 404 });
        }
        // Check if the OTP matches
        if (user.otpCode == otpCode) {
            // Mark the user as verified
            user.isVerified = true;
            user.otpCode = null; // Optionally, clear the OTP after verification

            await user.save();

            return res.status(200).json({ message: 'OTP verified successfully', success: true, status: 200 });
        } else {
            return res.status(400).json({ message: 'Invalid OTP', success: false, status: 400 });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, status: 500 });
    }
};

const getLoggedInuser = async (req, res) => {

    const { email} = req.body;
    // console.log({userSent:{email:email,otpCode}})

    try {
        // Find the user by email
        const user = await userTemplate.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false, status: 404 });
        }
        // Check if the OTP matches
        if (user.otpCode == otpCode) {
            // Mark the user as verified
            user.isVerified = true;
            user.otpCode = null; // Optionally, clear the OTP after verification

            await user.save();

            return res.status(200).json({ message: 'OTP verified successfully', success: true, status: 200 });
        } else {
            return res.status(400).json({ message: 'Invalid OTP', success: false, status: 400 });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, status: 500 });
    }
};

module.exports = { loginUser,verifyOtp };