const express = require('express');
const userTemplate = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { loginUser } = require('../services/authController');
const { createToDo, getUserTodos, getAllTodos } = require('../services/todoServices');
const emailAPIKEY = require('../server');



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
            pass: process.env.API_KEY_EMAIL
        }
    });

    transport.use('compile', hbs(handlebarOptions));

    try {
        transport.sendMail({
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
        await newUser.save().then(()=>{
            sendEmail(fullName, email);
            res.status(200).json({ message: 'User Created', success: true })
        }).catch(err=>res.json({message:'Error creating user',success:false}));

        // Optionally send an email here
        

    } catch (error) {

    }

})

router.post('/login', loginUser);
router.post('/create-todo', createToDo);


module.exports = router;