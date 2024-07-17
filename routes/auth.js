const express = require('express');
const userTemplate = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { loginUser } = require('../services/authController');



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
const sendEmail = async (userName, email) => {

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
        const info = await transport.sendMail({
            from: '"Wok9ja" <info@floatsolutionhub.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome on board!", // Subject line
            template: 'welcome', // the name of the template file (without extension)
            context: { // the data to be passed to the template
                fullName: userName
            },

        });

        // console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}




router.post('/register', async (req, res) => {
    const { fullName, userName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userTemplate.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', status: false });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new userTemplate({
            fullName,
            userName,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();
        res.status(200).json({ message: 'User Created', status: true });

        // Optionally send an email here
        sendEmail(fullName, email)

    } catch (error) {

    }

})

router.post('/login',loginUser);


module.exports = router;