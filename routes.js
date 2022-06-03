const express = require('express')
const fspromises = require('fs').promises
const path = require('path')

const router = express.Router()

const filepath = path.join(__dirname, 'data.json')

//export router
module.exports = router

//filepath
const filepath = path.join(__dirname, 'data.json')

router.get('/:id', async (req, res) => {
  try {
    const animalData = await fspromises.promises.readFile(filepath, 'utf8')
    const parsedAnimalData = JSON.parse(animalData)
    res.render('lastwords')
  } catch (err) {}
})
