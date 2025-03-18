const { Router } = require('express')
const todosRoute = Router()
const {
	createTodos,
	deleteTodo,
	getTodos,
	getTodosById,
	updateTodos,
} = require('../controllers/todosController')

todosRoute.get('/', getTodos)
todosRoute.post('/', createTodos)
todosRoute.get('/:id', getTodosById)
todosRoute.patch('/:id', updateTodos)
todosRoute.delete('/:id', deleteTodo)

module.exports = todosRoute
