const { pool } = require('../config/db')

const getAlbums = async (req, res) => {
	try {
		const albums = await pool.query('SELECT * FROM albums;')
		res.status(200).json(albums.rows)
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const getAlbumById = async (req, res) => {
	try {
		const { id } = req.params
		const album = await pool.query('SELECT * FROM albums WHERE id = $1', [id])

		if (album.rows.length === 0) {
			return res.status(404).json({ err: "Bunday albom yo'q" })
		}

		res.status(200).json(album.rows[0])
	} catch (error) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const createAlbum = async (req, res) => {
	try {
		console.log(req.body)

		const { user_id, title } = req.body
		const newAlbum = await pool.query(
			'INSERT INTO albums (user_id, title) VALUES ($1, $2) RETURNING *',
			[user_id, title]
		)
		res.status(201).json(newAlbum.rows[0])
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const updateAlbum = async (req, res) => {
	try {
		const { id } = req.params
		const { user_id, title } = req.body

		const updateAlbum = await pool.query(
			'UPDATE albums SET user_id=$1, title=$2 WHERE id=$3 RETURNING *',
			[user_id, title, id]
		)

		if (updateAlbum.rows.length === 0) {
			return res.status(404).json({ err: 'Bunday ID-lik albom topilmadi' })
		}

		res.status(200).json(updateAlbum.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const deleteAlbum = async (req, res) => {
	try {
		const { id } = req.params
		const deleteAlbum = await pool.query(
			'DELETE FROM albums WHERE id = $1 RETURNING *',
			[id]
		)

		if (deleteAlbum.rows.length === 0) {
			return res.status(404).json({ err: "Bunday albom yo'q" })
		}

		res.status(200).json({ message: "Albom o'chirildi" })
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

module.exports = {
	getAlbums,
	getAlbumById,
	createAlbum,
	updateAlbum,
	deleteAlbum,
}
