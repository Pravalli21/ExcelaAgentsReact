const express = require('express');
const router = express.Router();
const Train = require('../models/train');
// router.get('/', async (req, res) => {
//   try {
//     const train = await Train.find();
//     res.json(train);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
 
 
router.get('/', async (req, res) => {
  const trainId = req.query.id;
  const sortField = req.query['_sort'];
  const sortOrder = req.query['_order'];
   
  try {
  if (!trainId) {
  return res.status(400).json({ error: 'Train ID is required' });
  }
   
  let sortOptions = {};
  if (sortField && sortOrder) {
  // Handle sorting based on provided parameters
  sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
  }
   
  // Query the "train" collection for documents with the specified id
  const trains = await Train.find({ id: String(trainId) })
  .sort(sortOptions);
   
  if (!trains || trains.length === 0) {
  return res.status(404).json({ error: 'No trains found with the specified ID' });
  }
   
  // Return the train documents as the API response
  res.json(trains);
  } catch (err) {
  console.error('Error fetching trains:', err);
  res.status(500).json({ error: 'Internal Server Error' });
  }
  });
  router.get('/health',(req,res)=> {
    const result={status:"UP"};
    res.send(result)
  });
 
module.exports=router;