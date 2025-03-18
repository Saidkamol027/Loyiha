const { pool } = require('../config/db')

const getPhotos = async (req, res) => {
	try {
		const { albumId } = req.query
		let query = 'SELECT * FROM photos'
		let params = []
		if (albumId) {
			query += ' WHERE album_id = $1'
			params.push(albumId)
		}
		const photos = await pool.query(query, params)
		res.status(200).json(photos.rows)
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const getPhotoById = async (req, res) => {
	try {
		const { id } = req.params
		const photo = await pool.query('SELECT * FROM photos WHERE id = $1', [id])

		if (photo.rows.length === 0) {
			return res.status(404).json({ err: "Bunday rasm yo'q" })
		}

		res.status(200).json(photo.rows[0])
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const createPhoto = async (req, res) => {
	try {
		const { album_id, title, url } = req.body
		const newPhoto = await pool.query(
			'INSERT INTO photos (album_id, title, url) VALUES ($1, $2, $3) RETURNING *',
			[album_id, title, url]
		)
		res.status(201).json(newPhoto.rows[0])
	} catch (err) {
		console.log(err)

		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const deletePhoto = async (req, res) => {
	try {
		const { id } = req.params
		const deletedPhoto = await pool.query(
			'DELETE FROM photos WHERE id = $1 RETURNING *',
			[id]
		)

		if (deletedPhoto.rows.length === 0) {
			return res.status(404).json({ err: "Bunday rasm yo'q" })
		}

		res.status(200).json({ message: "Rasm o'chirildi" })
	} catch (err) {
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

const updatePhoto = async (req, res) => {
	try {
		const { id } = req.params
		const { album_id, title, url } = req.body
		
		if (!album_id && !title && !url) {
			return res
				.status(400)
				.json({ err: "Yangilash uchun hech qanday ma'lumot berilmadi" })
		}

		const updatedPhoto = await pool.query(
			'UPDATE photos SET album_id = COALESCE($1, album_id), title = COALESCE($2, title), url = COALESCE($3, url) WHERE id = $4 RETURNING *',
			[album_id, title, url, id]
		)

		if (updatedPhoto.rows.length === 0) {
			return res.status(404).json({ err: "Bunday rasm yo'q" })
		}

		res.status(200).json(updatedPhoto.rows[0])
	} catch (err) {
		console.log(err)
		res.status(500).json({ err: 'Server bilan xatolik' })
	}
}

module.exports = {
	getPhotos,
	getPhotoById,
	createPhoto,
	deletePhoto,
	updatePhoto,
}
