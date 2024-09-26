const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const Train = require('./Modal/TrainModal')

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
app.use(cors())

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB Atlas')
})



//Route to get the data from the Database 
app.get('/trains', async (req, res) => {
    try {
      const { id, _sort, _order } = req.query;
  
      if (!id) {
        return res.status(400).json({ error: 'Missing id parameter in the query' });
      }
  
      let sortQuery = {};
      
      if (_sort) {
        sortQuery[_sort] = _order === 'asc' ? 1 : -1;
      }
  
      const trains = await Train.find({ id }).sort(sortQuery);
  
      if (!trains || trains.length === 0) {
        return res.status(404).json({ error: 'Trains not found for the given id' });
      }
  
      res.json(trains);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
