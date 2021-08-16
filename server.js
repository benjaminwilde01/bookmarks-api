// DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 3003

// MIDDLEWARE
app.use(express.json)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})