import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// empty images folder
export const emptyImagesFolder = () => {
  const images = path.join(__dirname, '../images')

  fs.readdir(images, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(images, file), err => {
        if (err) throw err
      })
    }
  })
}