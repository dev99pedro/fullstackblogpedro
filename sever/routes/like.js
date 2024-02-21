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
    const postid = req.body.postid;
    const userid = req.user.userid;

    db.query('SELECT * FROM likes WHERE postid = ? AND userid = ?', [postid, userid], (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (data.length > 0) {
            // Se já existe um like, remova-o
            db.query('DELETE FROM likes WHERE postid = ? AND userid = ?', [postid, userid], (error, data) => {
                if (error) {
                    return res.status(500).send(error);
                }

                // Decrementar o número de curtidas na tabela post
                db.query('UPDATE post SET likes = likes - 1 WHERE id = ?', [postid], (error, data) => {
                    if (error) {
                        return res.status(500).send(error);
                    }

                    // Retorna a resposta se necessário
                    res.send(data);
                });
            });
        } else {
            // Se não existe um like, adicione-o
            db.query('INSERT INTO likes (`postid`, `userid`) VALUES (?, ?)', [postid, userid], (error, data) => {
                if (error) {
                    return res.status(500).send(error);
                }

                // Incrementar o número de curtidas na tabela post
                db.query('UPDATE post SET likes = likes + 1 WHERE id = ?', [postid], (error, data) => {
                    if (error) {
                        return res.status(500).send(error);
                    }

                    // Retorna a resposta se necessário
                    res.send(data);
                });
            });
        }
    });
});


module.exports = routerLike