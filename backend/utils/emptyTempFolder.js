import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// empty temp folder
export const emptyTempFolder = () => {
  const temp = path.join(__dirname, '../temp')

  fs.readdir(temp, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(temp, file), err => {
        if (err) throw err
      })
    }
  })
}
