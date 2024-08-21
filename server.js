const express = require('express');
const app = express();

const PORT = process.env.PORT || 5050;
const jwtSecret = process.env.JWT_SECRET;
const emailAPIKEY = process.env.API_KEY_EMAIL

const authRoutes = require('./src/app/routes/auth');
const userRoutes = require('./src/app/routes/userRoutes');
const gigRoutes = require('./src/app/routes/gigRoutes');
const serviceRoutes = require('./src/app/routes/serviceRoutes');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



const ENVIROMENT = process.env.ENVIROMENT


let URL = "";

ENVIROMENT == 'development' ? URL = process.env.DATABASE_URL : URL = process.env.DATABASE_URL

dotenv.config()
app.use(express.json());
app.use(cors());

const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL_LIVE);



db.on('error', console.error.bind('console', 'connection error :'));
db.once('open', () => console.log('Conncection successful!'));


app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', gigRoutes);
app.use('/api', serviceRoutes);





app.listen(5050, () => console.log('Server up!', `running on : ${PORT}`));
module.exports = { jwtSecret, emailAPIKEY }