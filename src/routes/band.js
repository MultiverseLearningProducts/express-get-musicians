const express = require("express");
const router = express.Router()
const { Band, Musician } = require("../../models")

router.use(express.json())
router.use(express.urlencoded())

function simplifyBands(band) {
  return {
    name: band.name,
    genre: band.genre,
    musicians: band.musicians
  };
}

router.get('/', async (req, res) => {
  const bands = await Band.findAll({ include: Musician })
  const simplifiedBands = bands.map(simplifyBands)
  res.json(simplifiedBands)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id 
  const band = await Band.findByPk(id, { include: Musician })
  const simplifiedBand = simplifyBands(band)
  res.json(simplifiedBand)
})

module.exports = router;