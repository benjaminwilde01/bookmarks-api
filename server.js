const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = 3003
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// confugure cors middleware for other requests
// const allowlist = ['http://localhost:3003']
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// app.options('*', cors()) // include before other routes

// SETUP OUR MONGO
// Error / Disconnection
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eirqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

// controllers
const bookmarksController = require('./controllers/bookmarks')
app.use('/bookmarks', bookmarksController)

app.get('/', (req, res) => {
    res.redirect('/bookmarks')
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
