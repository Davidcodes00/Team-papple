const express = require('express')
const fspromises = require('fs').promises
const path = require('path')

const router = express.Router()

//export router
module.exports = router

//filepath
const filepath = path.join(__dirname, 'data.json')

router.get('/:id', async (req, res) => {
  try {
    //read our data
    const animalData = await fspromises.readFile(filepath, 'utf8')
    //parse data from string back into object
    const parsedAnimalData = JSON.parse(animalData)
    console.log('parsed data', parsedAnimalData)
    //get animals array out of the object in out data.json
    const arrayOfAnimals = parsedAnimalData.animals
    //now we have access to our animals array match to ID
    let theChosenAnimal = arrayOfAnimals.find(
      (element) => element.id === Number(req.params.id)
    )
    console.log('the chosed animal', theChosenAnimal)
    return res.render('lastwords', theChosenAnimal)
  } catch (err) {
    console.log(err, 'I could not find your chosen animal')
  }
})
