//import fs/promises
import fs from 'fs/promises'

// Move edited image from temp folder to images folder
export const moveFile = async (source, destination) => {
  try {
    await fs.rename(source, destination)
    const file = await fs.readFile(destination)
    const extension = destination.split('.')[1]
    const dataUrl = `data:image/${extension};base64,${file.toString('base64')}`
    return dataUrl
  } catch (error) {
    throw new Error('Error moving file')
  }
}