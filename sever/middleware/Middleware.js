const { verify } = require('jsonwebtoken')
const validateToken = (req, res, next) => {
    const header = req.header('token')

    if (!header) {
        res.send({ error: 'you need to login' })
    }

    try {
        const verifyToken = verify(header, 'key')
        req.user = verifyToken
  

        if (verifyToken) {
            return next()
        }
    }

    catch (error) {
        return res.json({ error: 'error' })
    }
}

module.exports = { validateToken }