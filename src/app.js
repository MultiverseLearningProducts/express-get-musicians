const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.use(express.json())
app.use(express.urlencoded())

app.get('/musicians', async (req, res) => {
  const musicians = await Musician.findAll()
  res.json(musicians)
})

app.post('/musicians', async (req, res) => {
  const musicians = await Musician.findAll()
  musicians.push(req.body)
  res.json(musicians)
})

app.get('/musicians/:id', async (req, res) => {
  const musicianId = parseInt(req.params.id)
  const musicians = await Musician.findAll()

  if(musicianId >= 1 && musicianId <= 3) {
    res.json(musicians[musicianId - 1])
  } else {
    res.status(404).json({ message: 'Musician not found' })
  }
})

app.put('/musicians/:id', async (req, res) => {
  const musicians = await Musician.findAll()
  const id = req.params.id
  musicians[id - 1] = req.body

  res.json(musicians)
})

app.delete('/musicians/:id', async (req, res) => {
  const musicians = await Musician.findAll()
  const id = req.params.id
  musicians.splice(id - 1, 1)

  res.json(musicians)
})

app.get('/bands', async (req, res) => {
  const bands = await Band.findAll()
  res.json(bands)
})

module.exports = app;