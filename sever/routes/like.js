const express = require('express')
const routerLike = express.Router()
const { db } = require('./user.js')
const { validateToken } = require('../middleware/Middleware.js')



routerLike.get('/', validateToken, (req, res) => {
    const userid = req.user.userid

    db.query('SELECT * FROM likes WHERE userid = ? ', [userid], (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(data)
        }
    })
})

routerLike.post('/', validateToken, (req, res) => {
    const postid = req.body.postid
    const userid = req.user.userid





    db.query('SELECT * FROM likes WHERE postid = ? AND userid = ?', [postid, userid], (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data.length > 0) {
            db.query('DELETE FROM likes WHERE postid = ? AND userid = ?', [postid, userid], (error, data) => {
                if (error) {
                    res.status(200).send(error)
                }

                if (data) {
                    res.send(data)
                }
            })
        } else {
            db.query('INSERT INTO likes (`postid`, `userid`) VALUES (?,?)', [postid, userid], (error, data) => {
                if (error) {
                    res.status(200).send(error)
                }

                if (data) {
                    res.send(data)
                }
            })
        }
    })
})


module.exports = routerLike