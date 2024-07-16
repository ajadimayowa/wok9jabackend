const express = require('express');
const userTemplate = require('../../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const router = express.Router();



// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async () => {

    const transport = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: "api",
            pass: "a3aec3bcb5b43a850a99b571593d873d"
        }
    });

    // send mail with defined transport object
    const info = await transport.sendMail({
        from: 'info@demomailtrap.com', // sender address
        to: "floathhub@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

router.post('/signup', async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    let newUser = new userTemplate({
        fullName,
        userName,
        email,
        password: await bcrypt.hash(password,10)
    })

    try {
        newUser.save()
        .then(user => res.status(200).json({message : 'User Created', status:true}))
        .catch(err =>res.json({message:err}))
        
    } catch (error) {
        
    }

    })

router.get('/login', (req, res) => {

});


module.exports = router;