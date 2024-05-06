'use strict'
require('dotenv').config()
const express = require('express')
const myDB = require('./connection')
const fccTesting = require('./freeCodeCamp/fcctesting.js')
//Solution3: Set up Passport
const session = require('express-session')
const passport = require('passport')
const app = express()

//Solution1: Setup a Template Engine
app.set('view engine', 'pug')
app.set('views', './views/pug')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

fccTesting(app) //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.route('/').get((req, res) => {
//Solution2: Use a Template Engine's Powers
  res.render('index', { title: 'Hello', message: 'Please log in' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})