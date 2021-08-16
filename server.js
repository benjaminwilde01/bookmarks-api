const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = 3003
const dotenv = require('dotenv')
dotenv.config()

// middleware
app.use(express.json());

// confugure cors middleware for other requests
const whitelist = ['http://localhost:3000']
// const corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }

// app.use(cors(corsOptions))
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
app.use('/bookmarks', bookmarksController)

app.get('/', (req, res) => {
    res.redirect('/bookmarks')
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
