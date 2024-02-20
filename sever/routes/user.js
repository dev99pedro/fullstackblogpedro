const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const userRouter = express.Router()
const { sign } = require('jsonwebtoken')
const { validateToken } = require('../middleware/Middleware.js')




const db = mysql.createConnection({
    host: 'us-cluster-east-01.k8s.cleardb.net',
    user: 'b18ef4e490c3f2',
    password: '899deff7',
    database: 'heroku_5e61a92f5fae40c'
})


userRouter.get('/', validateToken, (req, res) => {
    const username = req.user.username
    db.query('SELECT * FROM user WHERE username = ? ', username, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }

        if (data) {
            res.status(200).send(data)
        }
    })
})

userRouter.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const hashPassword = await bcrypt.hash(password, 10)


    db.query('INSERT INTO user (`username`, `password`) VALUES (?,?)', [username, hashPassword], (error, data) => {
        if (error) {
            
            res.send(error)
        }

        if (data) {
            res.status(200).send('sucesso')
        }
    })
})


userRouter.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query('SELECT * FROM user WHERE username = ?', username, async (error, data) => {


        if (error) {
            res.send({ message: 'error' })
            return; // Certifique-se de sair da função em caso de erro no banco de dados
        }

        if (data.length === 0) {
            res.send({ error: 'Usuário não encontrado' })
            return; // Saia da função se não houver nenhum usuário com o nome de usuário fornecido
        }

        const passwordHash = data[0].password
        const userid = data[0].id
        const compareHash = await bcrypt.compare(password, passwordHash)

        if (data.length > 0) {

            const acessToken = sign({ username: username, userid: userid }, 'key')


            if (compareHash) {
                res.send({ token: acessToken, data: data })
            } else {
                res.send({ error: 'senha incorreta' })
            }


        }

    })
})


module.exports = { userRouter: userRouter, db: db }
