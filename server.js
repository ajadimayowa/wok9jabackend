const express = require('express');
const app = express();
const port = 5050;

const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')

const ENVIROMENT = process.env.ENVIROMENT

let URL = "";

ENVIROMENT == 'development'?URL = process.env.DATABASE_URL : URL = process.env.DATABASE_URL

dotenv.config()
app.use(express.json());
app.use(cors());

const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL_LIVE);



db.on('error',console.error.bind('console', 'connection error :'));
db.once('open', ()=>console.log('Conncection successful!'))
app.use('/api', authRoutes);






app.listen(port, ()=>console.log('Server up!'));