const { Router } = require('express')
const postsRoute = Router()
const {
	createPost,
	deletePost,
	getPostById,
	getPosts,
	updatePost,
} = require('../controllers/postsController')

postsRoute.get('/', getPosts)
postsRoute.post('/', createPost)
postsRoute.get('/:id', getPostById)
postsRoute.patch('/:id', updatePost)
postsRoute.delete('/:id', deletePost)

module.exports = postsRoute
