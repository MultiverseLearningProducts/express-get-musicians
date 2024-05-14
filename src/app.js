const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.get('/musicians', async (req, res) => {
  const musicians = await Musician.findAll()
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

app.get('/bands', async (req, res) => {
  const bands = await Band.findAll()
  res.json(bands)
})

module.exports = app;