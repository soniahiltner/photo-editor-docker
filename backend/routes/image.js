import express from 'express'
import { adjustImage, convertImage, cropImage, cropResizeImage, editedImage, flipImage, frameImage, getImage, resizeImage, rotateImage, undoChanges, uploadImage } from '../controllers/image.js'

export const router = express.Router()

router.post("/upload", uploadImage)
router.post('/resize/:filename', resizeImage)
router.post('/convert/:filename', convertImage)
router.post('/rotate/:filename', rotateImage)
router.post('/flip/:filename', flipImage)
router.post('/adjust/:filename', adjustImage)
router.post('/frame/:filename', frameImage)
router.post('/cropresize/:filename', cropResizeImage)
router.post('/crop/:filename', cropImage)
router.get('/edit/:filename', editedImage)
router.get('/reset/:filename', undoChanges)
router.get('/:filename', getImage)