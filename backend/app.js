const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/user.routes.js');
const connectDB = require('./db/db.js');
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World!');
 });
 app.use('/users',userRoutes)

module.exports = app;