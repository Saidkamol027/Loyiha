const { Router } = require('express')
const albumsRoute = Router()
const {
	getAlbums,
	createAlbum,
	deleteAlbum,
	getAlbumById,
	updateAlbum,
} = require('../controllers/albumsController')

albumsRoute.get('/', getAlbums)
albumsRoute.get('/:id', getAlbumById)
albumsRoute.post('/', createAlbum)
albumsRoute.delete('/:id', deleteAlbum)
albumsRoute.patch('/:id', updateAlbum)

module.exports = albumsRoute
