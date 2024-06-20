import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// delete all files in uploads folder, images folder and temp folder 
export const deleteFiles = () => {
  const uploads = path.join(__dirname, '../uploads')
  const images = path.join(__dirname, '../images')
  const temp = path.join(__dirname, '../temp')

  fs.readdir(uploads, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(uploads, file), err => {
        if (err) throw err
      })
    }
  })

  fs.readdir(images, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(images, file), err => {
        if (err) throw err
      })
    }
  })

  fs.readdir(temp, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(temp, file), err => {
        if (err) throw err
      })
    }
  })
}