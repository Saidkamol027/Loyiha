require('dotenv').config()
const express = require('express')
const userRoute = require('./src/routes/usersRoutes')
const todosRoute = require('./src/routes/todosRoutes')
const commentsRoute = require('./src/routes/commentsRoutes')
const albumaRoute = require('./src/routes/albumsRoutes')
const photosRoute = require('./src/routes/photosRoutes')
const postsRoute = require('./src/routes/postsRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/users', userRoute)
app.use('/todos', todosRoute)
app.use('/comments', commentsRoute)
app.use('/albums', albumaRoute)
app.use('/photos', photosRoute)
app.use('/posts', postsRoute)

app.listen(PORT, (req, res) => {
	console.log(`Server ${PORT} da ishlamoqda`)
})
