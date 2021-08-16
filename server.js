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
var allowlist = ['http://localhost:3003']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.options('*', cors()) // include before other routes
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
  
// SETUP OUR MONGO
// Error / Disconnection
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eirqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
// mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

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
app.use('/bookmarks', cors(corsOptionsDelegate), bookmarksController)

app.get('/', (req, res) => {
    res.redirect('/bookmarks')
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
