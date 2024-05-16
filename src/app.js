const express = require("express");
const app = express();

const musiciansRouter = require('./routes/musician.js')
const bandsRouter = require('./routes/band.js')

app.use('/musicians', musiciansRouter)
app.use('/bands', bandsRouter)

module.exports = app;