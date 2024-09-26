const mongoose = require('mongoose')

const trainSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
})

const Train = mongoose.model('Train', trainSchema)

module.exports = Train
