const { pool } = require('../config/db')

const getTodos = async (req, res) => {
	try {
		const todos = await pool.query('SELECT * FROM todos')
		res.status(200).json(todos.rows)
	} catch (error) {
		res.status(500).json({ err: 'Server bilan hatolik' })
	}
}

const getTodosById = async (req, res) => {
	try {
		const { id } = req.params
		const todosById = await pool.query('SELECT * FROM todos WHERE id = $1', [
			id,
		])

		if (todosById.rows.length === 0) {
			return res.status(404).json({ err: "Bunday 'id'lik user yo'q" })
		}

		res.status(200).json(todosById.rows[0])
	} catch (error) {
		res.status(500).json({ err: 'Server bilan hatolik' })
	}
}

const createTodos = async (req, res) => {
	try {
		const { user_id, title, completed } = req.body
		if (!user_id || !title || completed === undefined || completed === null) {
			return res
				.status(400)
				.json({ err: 'Iltimos, hamma maydonlarni to‘ldiring' })
		}
		console.log(user_id, title, completed)

		const newTodos = await pool.query(
			'INSERT INTO todos (user_id, title, completed) VALUES ($1, $2, $3) RETURNING *',
			[user_id, title, completed]
		)
		res.status(201).json(newTodos.rows[0])
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

const updateTodos = async (req, res) => {
	try {
		const { id } = req.params

		const { user_id, title, completed } = req.body

		const updateTodo = await pool.query(
			'UPDATE todos SET user_id = $1, title = $2, complested = $3 WHERE id = $4 RETURNING *',
			[user_id, title, completed, Number(id)]
		)
		if (updateTodo.rows.length === 0) {
			return res.status(404).json({ err: "Bunday 'id'lik todo yo'q" })
		}
		res.status(200).json(updateTodo.rows[0])
	} catch (error) {
		res.status(500).json({ err: 'Server bilan muammo' })
	}
}

const deleteTodo = async (req, res) => {
	try {
		const { id } = req.params
		const deleteTodo = await pool.query(
			'DELETE FROM todos WHERE id = $1 RETURNING *',
			[id]
		)

		if (deleteTodo.rows.length === 0) {
			return res.status(404).json({ err: "Bunday 'id'lik todo yo'q" })
		}

		res.status(200).json({ message: 'Todo olib tashlandi' })
	} catch (error) {
		res.status(500).json({ err: 'Server bilan muammo' })
	}
}

module.exports = {
	getTodos,
	getTodosById,
	createTodos,
	updateTodos,
	deleteTodo,
}
