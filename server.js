const express = require('express')
const hbs = require('express-handlebars')
const fspromises = require('fs').promises
const path = require('path')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

module.exports = server

const filepath = path.join(__dirname, 'data.json')

server.get('/', async (req, res) => {
  try {
    const viewData = await fspromises.readFile(filepath, 'utf-8')
    const parsedData = JSON.parse(viewData)
    console.log('I followed the path')
    res.render('home', viewData)
  } catch (err) {
    console.log(err, 'couldnt parse data')
  }
})
