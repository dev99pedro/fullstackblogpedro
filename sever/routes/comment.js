const express = require('express')
const routerComment = express.Router()
const { db } = require('./user.js')
const { validateToken } = require('../middleware/Middleware.js')


routerComment.post('/', validateToken, (req, res) => {
    const commentBody = req.body.commentBody
    const postid = req.body.postid
    const username = req.user.username


    db.query('INSERT INTO comment (`commentBody`, `postid`, `username`) VALUES (?,?,?)', [commentBody, postid, username], (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(username)
        }
    })
})


routerComment.get('/:postid', (req, res) => {
    const postid = req.params.postid
    db.query('SELECT * FROM comment WHERE postid = ?', postid, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(data)
        }
    })
})


routerComment.delete('/delete/:id', validateToken, (req, res) => {
    const id = req.params.id
    const username = req.user.username

    db.query('DELETE FROM comment WHERE id = ? AND username = ?', [id, username], (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(data)
        }
    })
})

module.exports = routerComment