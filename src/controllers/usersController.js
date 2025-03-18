const { pool } = require('../config/db')

const getUsers = async (req, res) => {
	try {
		const users = await pool.query('SELECT * FROM users;')
		res.status(200).json(users.rows)
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const getUsersById = async (req, res) => {
	try {
		const { id } = req.params
		const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])

		if (user.rows.length === 0) {
			return res.status(404).json({ err: "Bunday foydalanuvchi yo'q" })
		}

		res.status(200).json(user.rows[0])
	} catch (error) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const createUser = async (req, res) => {
	try {
		console.log(req.body)

		const { name, email, username, phone, website } = req.body
		const newUser = await pool.query(
			'INSERT INTO users (name, email, username, phone, website) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[name, email, username, phone, website]
		)
		res.status(201).json(newUser.rows[0])
	} catch (err) {
		console.log(err.message)

		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const updateUsers = async (req, res) => {
	try {
		const { id } = req.params
		const { name, email, username, phone, website } = req.body

		const updateUser = await pool.query(
			'UPDATE users SET name=$1, email=$2, username=$3, phone=$4, website=$5 WHERE id=$6 RETURNING *',
			[name, email, username, phone, website, id]
		)

		if (updateUser.rows.length === 0) {
			return res
				.status(404)
				.json({ err: 'Bunday ID-lik foydalanuvchi topilmadi' })
		}

		res.status(200).json(updateUser.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params
		const deleteUser = await pool.query(
			'DELETE FROM users WHERE id = $1 RETURNING *',
			[id]
		)

		if (deleteUser.rows.length === 0) {
			return res.status(404).json({ err: "Bunday user yo'q" })
		}

		res.status(200).json({ message: "Foydalanuvchi o'chirildi" })
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

module.exports = { getUsers, getUsersById, createUser, updateUsers, deleteUser }
