const { Router } = require('express')
const commentsRoute = Router()
const {
	getComments,
	createComment,
	deleteComment,
	getCommentById,
	updateComment,
	getCommentsByPostId,
} = require('../controllers/commentsController')

commentsRoute.get('/', getComments)
commentsRoute.post('/', createComment)
commentsRoute.get('/:id', getCommentById)
commentsRoute.patch('/:id', updateComment)
commentsRoute.delete('/:id', deleteComment)
commentsRoute.get('/post_id', getCommentsByPostId)
commentsRoute.get('/posts/:post_id/comments', getCommentsByPostId)

module.exports = commentsRoute
