const express = require('express')
const bookmarkRoute = express.Router()
const Bookmark = require('../models/bookmark')

bookmarkRoute.get('/', (req, res) => {
    Bookmark.find({}, (err, foundBookmark) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.status(200).json(foundBookmark)
    })
})

bookmarkRoute.post('/', (req, res) => {
    Bookmark.create(req.body, (err, createdBookmark) => {
        if (err) {
            res.status(400).json({ error: err })
        }
        res.status(200).json(createdBookmark)
    })
})

module.exports = bookmarkRoute