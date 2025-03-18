const { Router } = require('express')
const userRoute = Router()
const {
	createUser,
	deleteUser,
	getUsers,
	getUsersById,
	updateUsers,
} = require('../controllers/usersController')

userRoute.get('/', getUsers)
userRoute.post('/', createUser)
userRoute.get('/:id', getUsersById)
userRoute.patch('/:id', updateUsers)
userRoute.delete('/:id', deleteUser)

module.exports = userRoute
