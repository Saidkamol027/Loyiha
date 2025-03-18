const { pool } = require('../config/db')

const getPosts = async (req, res) => {
	try {
		const posts = await pool.query('SELECT * FROM posts;')
		res.status(200).json(posts.rows)
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const getPostById = async (req, res) => {
	try {
		const { id } = req.params
		const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id])

		if (post.rows.length === 0) {
			return res.status(404).json({ err: "Bunday post yo'q" })
		}

		res.status(200).json(post.rows[0])
	} catch (error) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const createPost = async (req, res) => {
	try {
		const { title, body, user_id } = req.body
		const newPost = await pool.query(
			'INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
			[title, body, user_id]
		)

		console.log([title, body, user_id])

		res.status(201).json(newPost.rows[0])
	} catch (err) {
		console.log(err)

		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const updatePost = async (req, res) => {
	try {
		const { id } = req.params
		const { title, body } = req.body

		const updatedPost = await pool.query(
			'UPDATE posts SET title=$1, body=$2 WHERE id=$3 RETURNING *',
			[title, body, id]
		)

		if (updatedPost.rows.length === 0) {
			return res.status(404).json({ err: "Bunday post yo'q" })
		}

		res.status(200).json(updatedPost.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const deletePost = async (req, res) => {
	try {
		const { id } = req.params
		const deletedPost = await pool.query(
			'DELETE FROM posts WHERE id = $1 RETURNING *',
			[id]
		)

		if (deletedPost.rows.length === 0) {
			return res.status(404).json({ err: "Bunday post yo'q" })
		}

		res.status(200).json({ message: "Post o'chirildi" })
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

module.exports = { createPost, updatePost, deletePost, getPostById, getPosts }
