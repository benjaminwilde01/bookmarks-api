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

bookmarkRoute.put('/:id', (req, res) => {
    Bookmark.findByIdAndUpdate(req.params.id, req.body, {
        new: true }, (err, updatedBookmark) => {
            if (err) {
                res.status(400).json({ error: err })
            }
            res.status(200).json(updatedBookmark)
    })
})

bookmarkRoute.delete('/:id', (req, res) => {
    Bookmark.findByIdAndRemove(req.params.id, (err, deletedBookmark) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json({
            'deleted_bookmark': deletedBookmark
        })
    })
})

module.exports = bookmarkRoute