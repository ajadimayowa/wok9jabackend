const express = require('express');
const userTemplate = require('../../../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { loginUser,verifyOtp } = require('../contollers/authController');



const router = express.Router();


// Configure Handlebars options
const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./emailTemps/'),
        defaultLayout: false
    },
    viewPath: path.resolve('./emailTemps/'),
    extName: '.hbs'
};


// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (userName, email, otpCode,verificationLink) => {
    console.log({ email: "sent!" })
    var transport = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "api",
            pass: "d633904fa3a5130623dd7d9404bf637f"
        }
    });

    transport.use('compile', hbs(handlebarOptions));

    try {
        transport.sendMail({
            from: '"Wok9ja" <info@floatsolutionhub.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome on board!", // Subject line
            template: 'verification', // the name of the template file (without extension)
            context: { // the data to be passed to the template
                fullName: userName,
                verificationCode: otpCode,
                verificationLink:verificationLink
            },

        });

        // console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}




router.post('/register', async (req, res) => {
    const { fullName, userName, email, password, phoneNumber,otpCode,verificationLink} = req.body;
    // console.log('signing up :', req.body)

    try {
        // Check if the user already exists
        const existingUser = await userTemplate.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists', success: false, status: 409 });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new userTemplate({
            fullName,
            userName,
            email,
            phoneNumber,
            isVerified: false,
            verificationLink,
            otpCode,
            password: hashedPassword
        });
        // console.log({saving:fullName,otp:otpCode,email:email,verifLink:verificationLink})
        // Save the new user to the databases
        await newUser.save().then(() => {
            res.status(200).json({ message: 'User Created', success: true, status: 200 })
            sendEmail(fullName, email, otpCode,verificationLink);
        }).catch(err => res.status(400).json({ message: `Error creating user : ${err}`, success: false}));

        // Optionally send an email here


    } catch (error) {
        res.status(400).json({ message: error.message, success: false, status: 400 })
    }

})

router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);

module.exports = router;