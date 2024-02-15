const express = require('express')
const cors = require('cors')

const sever = express()



sever.use(cors())
sever.use(express.json())




const { userRouter } = require('./routes/user.js')
const postRouter = require('./routes/post.js')
const routerComment = require('./routes/comment.js')
const routerLike = require('./routes/like.js')



sever.use('/user', userRouter)
sever.use('/post', postRouter)
sever.use('/comment', routerComment)
sever.use('/like', routerLike)


sever.listen(3001, () => {
    console.log('show')
})

