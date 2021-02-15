const express = require('express')
const level = require('level')

const app = express()
app.use(express.json())
app.use('/', require('./router.js'))

app.listen(3000)