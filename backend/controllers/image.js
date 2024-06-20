import fsp from 'fs/promises'
import sharp from 'sharp'
import multer from 'multer'
import path from 'path'
import { moveFile } from '../utils/moveFile.js'
import { readFile } from '../utils/readFile.js'
import { emptyTempFolder } from '../utils/emptyTempFolder.js'
import { emptyImagesFolder } from '../utils/emptyImagesFolder.js'

// set storage engine
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'image' + '.' + file.mimetype.split('/')[1])
  }
})

//upload image
const upload = multer({ storage }).single('image')

export const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to upload image' })
      return
    }

    // get image data
    const { filename } = req.file
    const originalPath = path.join('./uploads', filename)
    const imagePath = path.join('./images', filename)

    try {
      const file = await fsp.readFile(originalPath)
      const image = sharp(file)
      await image.toFile(imagePath)
      // read
      readFile(filename, imagePath)
        .then((result) => {
          const { dataUrl, width, height } = result
          res.status(200).json({ filename, dataUrl, width, height })
        })
        .catch((error) => {
          console.error(error)
          res.status(500).send('Error reading file')
        })
    } catch (error) {
      res.status(500).send('Error getting image')
    }
  })
}

// get original image and reset edited images folder
export const getImage = async (req, res) => {
  const { filename } = req.params
  const originalPath = path.join('./uploads', filename)
  const imagePath = path.join('./images', filename)
  // delete all files in images folder and temp folder
  emptyImagesFolder()
  emptyTempFolder()

  try {
    const file = await fsp.readFile(originalPath)
    const image = sharp(file)
    await image.toFile(imagePath)
    // read
    readFile(filename, imagePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error getting image')
  }
}

// Resize image
export const resizeImage = async (req, res) => {
  const { filename } = req.params
  const { newWidth, pixel, percentage, percentageValue } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./images', filename)
  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    const image = sharp(file)
    if (pixel) {
      image.resize({ width: parseInt(newWidth) })
    }
    if (percentage) {
      image.resize({ width: Math.round(parseInt(newWidth) * parseInt(percentageValue) / 100) })
    }
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error resizing file')
  }
}

// Convert image
export const convertImage = async (req, res) => {
  const { filename } = req.params
  const { format, quality } = req.body
  const imagePath = path.join('./images', filename)

  // read image
  try {
    const file = await fsp.readFile(imagePath)
    // process image
    const image = sharp(file)
    if (format === 'jpeg') {
      image.jpeg({ quality: parseInt(quality) })
    }
    if (format === 'png') {
      image.png({ quality: parseInt(quality) })
    }
    if (format === 'webp') {
      image.webp({ quality: parseInt(quality) })
    }
    if (format === 'tiff') {
      image.tiff({ quality: parseInt(quality) })
    }
    // New filename
    const newFilename = filename.split('.')[0] + '.' + format
    const savePath = path.join('./images', newFilename)
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(newFilename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ newFilename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })

  } catch (error) {
    res.status(500).send('Error converting file')
  }
}

// Rotate image
export const rotateImage = async (req, res) => {
  const { filename } = req.params
  const { degrees } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./images', filename)
  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    await sharp(file).rotate(parseInt(degrees)).toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error rotating file')
  }
}

// Flip image
export const flipImage = async (req, res) => {
  const { filename } = req.params
  const { flipV, flop } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./images', filename)

  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    const image = sharp(file)
    if (flipV) {
      image.flip()
    }
    if (flop) {
      image.flop()
    }
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error flipping file')
  }
}

//Adjust image 
export const adjustImage = async (req, res) => {
  const { filename } = req.params
  const { brightness, lightness, hue, saturation } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./temp', filename)

  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    const image = sharp(file)
    image.modulate({
      brightness: 1 + parseInt(brightness) / 100,
      lightness: 1 + parseInt(lightness) / 2,
      hue: parseInt(hue),
      saturation: 1 + parseInt(saturation) / 100
    })
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error adjusting file')
  }
}

// Frames
export const frameImage = async (req, res) => {
  const { filename } = req.params
  const { size, background, keepSize } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./temp', filename)

  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    // get metadata
    const metadata = await sharp(file).metadata()
    const inputWidth = metadata.width
    const inputHeight = metadata.height
    const image = sharp(file)

    if (keepSize === 'yes' && (parseInt(size) > inputWidth / 2 || parseInt(size) > inputHeight / 2)) {
      res.status(500).send('Frame size too large')
      return
    }
    image.extend({
      top: parseInt(size),
      bottom: parseInt(size),
      left: parseInt(size),
      right: parseInt(size),
      background: background
    })
    // resize image to original size
    if (keepSize === 'yes') {
      image.resize({ width: inputWidth - (2 * size), height: inputHeight - (2 * size) })
    }
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error framing file')
  }
}

// Crop and resize
export const cropResizeImage = async (req, res) => {
  const { filename } = req.params
  const { newWidthValue, newHeightValue, cropOption } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./temp', filename)

  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    const image = sharp(file)
    image.resize({ width: parseInt(newWidthValue), height: parseInt(newHeightValue), fit: 'cover', position: cropOption })
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error cropping file')
  }
}

// Crop image
export const cropImage = async (req, res) => {
  const { filename } = req.params
  const { left, top, width, height } = req.body
  const imagePath = path.join('./images', filename)
  const savePath = path.join('./images', filename)

  try {
    // read image
    const file = await fsp.readFile(imagePath)
    // process image
    const image = sharp(file)
    image.extract({ left: parseInt(left), top: parseInt(top), width: parseInt(width), height: parseInt(height) })
    // save image
    await image.toFile(savePath)
    // read the processed image and send response
    readFile(filename, savePath)
      .then((result) => {
        const { dataUrl, width, height } = result
        res.status(200).json({ filename, dataUrl, width, height })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error reading file')
      })
  } catch (error) {
    res.status(500).send('Error cropping file')
  }
}

// Apply changes
// Move edited image from temp folder to images folder
export const editedImage = async (req, res) => {
  const { filename } = req.params
  const imagePath = path.join('./temp', filename)
  const savePath = path.join('./images', filename)
  try {
    moveFile(imagePath, savePath)
      .then((dataUrl) => {
        res.status(200).json({ dataUrl })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error moving file')
      })
  } catch (error) {
    res.status(500).send('Error moving file')
  }
}

// Undo last changes
// Serve image in images folder and delete temp folder
export const undoChanges = async (req, res) => {
  const { filename } = req.params
  const imagePath = path.join('./images', filename)
  // read image
  readFile(filename, imagePath)
    .then((result) => {
      const { dataUrl, width, height } = result
      res.status(200).json({ filename, dataUrl, width, height })
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Error reading file')
    })
}

