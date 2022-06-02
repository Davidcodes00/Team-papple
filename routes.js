const express = require('express')
const fspromises = require('fs').promises
const path = require('path')

const router = express.Router()

const filepath = path.join(__dirname, 'data.json')
