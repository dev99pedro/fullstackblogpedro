const express = require('express')
const postRouter = express.Router()
const { db } = require('./user.js')
const { validateToken } = require('../middleware/Middleware.js')

postRouter.get('/', (req, res) => {
    db.query('SELECT * FROM post', (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(data)
        }
    })
})


postRouter.post('/createpost', validateToken, (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const img = req.body.img;
    const username = req.user.username;

    db.query('INSERT INTO post (`title`, `text`, `username`, `img`) VALUES (?,?,?,?)', [title, text, username, img], (error, data) => {
        if (error) {
            res.status(500).send(error);
        }

        if (data) {
            const postId = data.insertId; // Obtenha o ID do post recém-inserido


            // Envie o ID do post junto com os dados
            res.status(200).send({ data: data, postId: postId });
        }
    });
});




postRouter.get('/username/:username', (req, res) => {
    const username = req.params.username
    db.query('SELECT * FROM post WHERE username = ? ', username, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(data)
        }
    })
})



postRouter.get('/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM post WHERE id = ?', id, (error, data) => {
        if (error) {
            res.send(error)
        }

        if (data) {
            const postid = data[0].id

            res.send(data)
        }
    })
})


postRouter.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    // Exclua os comentários relacionados
    db.query('DELETE FROM comment WHERE postid = ?', id, (error, data) => {
        if (error) {
            res.status(500).send(error);
        } else {

            // Exclua o post
            db.query('DELETE FROM post WHERE id = ?', id, (errorPost, dataPost) => {
                if (errorPost) {

                    res.status(500).send(errorPost);
                } else {
                    res.status(200).send(dataPost);
                }
            });
        }
    });
});



module.exports = postRouter