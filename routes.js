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
    //console.log('parsed data', parsedAnimalData)
    //get animals array out of the object in out data.json
    const arrayOfAnimals = parsedAnimalData.animals
    //now we have access to our animals array match to ID
    let theChosenAnimal = arrayOfAnimals.find(
      (element) => element.id === Number(req.params.id)
    )
    //console.log('the chosen animal', theChosenAnimal)
    return res.render('lastwords', theChosenAnimal)
  } catch (err) {
    console.log(err, 'I could not find your chosen animal')
  }
})

router.post('/:id', async (req, res) => {
  console.log('in the post route')
  const id = req.params.id
  try {
    const userDetails = await fspromises.readFile(filepath, 'utf8')
    const parsedUserDetails = JSON.parse(userDetails)
    console.log(parsedUserDetails)

    //get the data from the user array
    const userDetailsArray = parsedUserDetails.userDetails
    let newArray = { ...userDetailsArray }
    console.log('the users details:', newArray)

    newArray.lastwords = req.body.lastwords
    //newArray.username = req.body.username
    //console.log('new array. last words', newArray.lastwords)

    let updatedUserDetails = newArray
    console.log('updatedUser', updatedUserDetails)
    let entireArray = {
      animals: parsedUserDetails.animals,
      userDetails: updatedUserDetails,
    }
    console.log('entire array: ', entireArray)

    const stringData = JSON.stringify(entireArray, null, 2)
    await fspromises.writeFile(filepath, stringData, 'utf8')
    //return res.render('fight', stringData)
    res.redirect(`/lastwords/${id}/fight`)
  } catch (err) {
    console.error(err, 'I did not rewrite or redirect')
  }
})

router.get('/:id/fight', async (req, res) => {
  try {
    //read our data
    const animalData = await fspromises.readFile(filepath, 'utf8')
    //parse data from string back into object
    const parsedAnimalData = JSON.parse(animalData)
    //console.log('parsed data', parsedAnimalData)
    //get animals array out of the object in out data.json
    const arrayOfAnimals = parsedAnimalData.animals
    //now we have access to our animals array match to ID
    let theChosenAnimal = arrayOfAnimals.find(
      (element) => element.id === Number(req.params.id)
    )
    //console.log('the chosen animal', theChosenAnimal)
    return res.render('fight', theChosenAnimal)
  } catch (err) {
    console.log(err, 'I could not find your chosen animal')
  }
})
