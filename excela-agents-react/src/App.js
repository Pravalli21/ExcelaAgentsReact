import './App.css'
import { React, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from './config'
// const {BASE_URL} = require('./config')
// const axios = require("axios")

function App() {
  const [trainNumber, setTrainNumber] = useState('')
  const [schedule, setData] = useState([])

  const getTrainSchedule = async () => {
    await axios
      .get(`${BASE_URL}/trains?id=${trainNumber}&_sort=seq&_order=asc`)
      .then((response) => {
        setData(response.data)
      })
    console.log(schedule)
  }

  const handleInputChange = (e) => {
    setTrainNumber(e.target.value)
  }

  return (
    <div className='container'>
      <h1 className='display-6'>Find a Train</h1>
      <div className='row'>
        <div className='col-2'>
          <input
            type='text'
            placeholder='Enter train number'
            className='form-control me-2'
            value={trainNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-1'>
          <button
            className='btn btn-primary'
            onClick={getTrainSchedule}
          >
            Find
          </button>
        </div>
        {schedule.length > 0 && (
          <div className='row mt-3 mb-4'>
            <div className='col-3'>Train: {schedule[0].name}</div>
            <div className='col-3'>From: {schedule[0].source}</div>
            <div className='col-3'>To: {schedule[0].destination}</div>
          </div>
        )}
      </div>
      <div className='row mt-3'>
        <div className='col-6'>
          <table className='table listing'>
            {schedule.length > 0 && (
              <thead>
                <tr>
                  <th>#</th>
                  <th>Station</th>
                  <th>Arrival</th>
                  <th>Departure</th>
                  <th>Distance</th>
                </tr>
              </thead>
            )}
            <tbody>
              {schedule.map((train) => (
                <tr key={train._id}>
                  <td>{train.seq}</td>
                  <td>{train.station}</td>
                  <td>{train.arrival.substr(0, 5)}</td>
                  <td>{train.departure.substr(0, 5)}</td>
                  <td>{train.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
