const { Router } = require('express')
const photosRoute = Router()
const {
	getPhotos,
	createPhoto,
	deletePhoto,
	getPhotoById,
	updatePhoto,
} = require('../controllers/photosController')

photosRoute.get('/', getPhotos)
photosRoute.get('/:id', getPhotoById)
photosRoute.delete('/:id', deletePhoto)
photosRoute.post('/', createPhoto)
photosRoute.patch('/:id', updatePhoto)

module.exports = photosRoute
