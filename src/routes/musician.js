const express = require("express");
const router = express.Router()
const {check, validationResult} = require('express-validator')
const { Musician } = require("../../models")

router.use(express.json())
router.use(express.urlencoded())

function simplifyMusicians(musician) {
  return {
    name: musician.name,
    instrument: musician.instrument
  };
}

router.get('/', async (req, res) => {
  const musicians = await Musician.findAll()
  const simplifiedMusicians = musicians.map(simplifyMusicians);
  res.json(simplifiedMusicians);
})

router.post('/', [
  check('name').not().isEmpty().trim(),
  check('instrument').not().isEmpty().trim()
], async (req, res) => {
  const musicians = await Musician.findAll()
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    res.json({ erros: errors.array() })
  } else {
    musicians.push(req.body)
    const simplifiedMusicians = musicians.map(simplifyMusicians);
    res.json(simplifiedMusicians);
  }
})

router.get('/:id', async (req, res) => {
  const musicianId = parseInt(req.params.id)
  const musician = await Musician.findByPk(musicianId)

  if(musicianId >= 1 && musicianId <= 3) {
    const simplifiedMusician = simplifyMusicians(musician)
    res.json(simplifiedMusician);
  } else {
    res.status(404).json({ message: 'Musician not found' })
  }
})

router.put('/:id', async (req, res) => {
  const musicians = await Musician.findAll()
  const id = req.params.id
  musicians[id - 1] = req.body
  const simplifiedMusicians = musicians.map(simplifyMusicians);
  res.json(simplifiedMusicians);
})

router.delete('/:id', async (req, res) => {
  const musicians = await Musician.findAll()
  const id = req.params.id
  musicians.splice(id - 1, 1)
  const simplifiedMusicians = musicians.map(simplifyMusicians);
  res.json(simplifiedMusicians);
})

module.exports = router;