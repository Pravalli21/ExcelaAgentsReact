const express = require('express');
const mongoose = require('mongoose');
const trainRoutes = require('./routes/trainroutes');
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
require('dotenv').config();
 
// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING)
.then((result) => {
    app.listen(5000);
    console.log('DB Connected');
})
.catch((err) => console.log(err + "unable to connect"))
 
 
// Routes
app.use('/trains',trainRoutes );
 
module.exports = app;