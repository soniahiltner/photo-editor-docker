import fsp from 'fs/promises'
import sharp from 'sharp'

export const readFile = async (filename, path) => {
  try {
    const file = await fsp.readFile(path)
    const extension = filename.split('.')[1]
    const dataUrl = `data:image/${extension};base64,${file.toString('base64')}`
    const metadata = await sharp(file).metadata()
    const width = metadata.width
    const height = metadata.height
    const result = { dataUrl, width, height }
    return result
  } catch (error) {
    throw new Error('Error reading file')
  }
}