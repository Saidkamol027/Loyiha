const { pool } = require('../config/db')

const getComments = async (req, res) => {
	try {
		const { post_id } = req.query 
		let query = 'SELECT * FROM comments'
		let params = []
		if (post_id) {
			query += ' WHERE post_id = $1'
			params.push(post_id)
		}
		const comments = await pool.query(query, params)
		res.status(200).json(comments.rows)
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const getCommentsByPostId = async (req, res) => {
	try {
		const { post_id } = req.params
		const posts = await pool.query(
			'SELECT * FROM comments WHERE post_id = $1',
			[post_id]
		)

		if (posts.rows.length === 0) {
			return res.status(404).json({ err: 'Maʼlumot topilmadi' })
		}

		res.status(200).json(posts.rows)
	} catch (error) {
		res.status(500).json({ err: 'Server bilan muammo' })
	}
}

const getCommentById = async (req, res) => {
	try {
		const { id } = req.params
		const comment = await pool.query('SELECT * FROM comments WHERE id = $1', [
			id,
		])

		if (comment.rows.length === 0) {
			return res.status(404).json({ err: "Bunday comment yo'q" })
		}

		res.status(200).json(comment.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const createComment = async (req, res) => {
	try {
		const { post_id, user_id, body, created_at } = req.body
		const newComment = await pool.query(
			'INSERT INTO comments (post_id, user_id, body, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
			[post_id, user_id, body, created_at]
		)
		res.status(201).json(newComment.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const updateComment = async (req, res) => {
	try {
		const { id } = req.params
		const { post_id, user_id, body, created_at } = req.body
		const updatedComment = await pool.query(
			'UPDATE comments SET post_id=$1, user_id=$2, body=$3, created_at=$4 WHERE id=$5 RETURNING *',
			[post_id, user_id, body, created_at, id]
		)
		if (updatedComment.rows.length === 0) {
			return res.status(404).json({ err: "Bunday comment yo'q" })
		}
		res.status(200).json(updatedComment.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const deleteComment = async (req, res) => {
	try {
		const { id } = req.params
		const deletedComment = await pool.query(
			'DELETE FROM comments WHERE id = $1 RETURNING *',
			[id]
		)

		if (deletedComment.rows.length === 0) {
			return res.status(404).json({ err: "Bunday comment yo'q" })
		}

		res.status(200).json({ message: "Comment o'chirildi" })
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

module.exports = {
	getCommentById,
	getComments,
	createComment,
	updateComment,
	deleteComment,
	getCommentsByPostId,
}
