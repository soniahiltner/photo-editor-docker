import { useRef, useState } from 'react'
import styles from './UploadForm.module.css'
import { useImage } from '../../hooks/useImage'

const fileTypes = [
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/tiff',
  'image/webp'
]

const UploadForm = () => {
  const form = useRef()
  const [selectedFile, setSelectedFile] = useState(null)
  const {
    setOriginalFilename,
    setFilename,
    setImage,
    loading,
    setLoading,
    setError,
    setOriginalWidth,
    setOriginalHeight,
    setWidth,
    setHeight
  } = useImage()

  // Disable button if no image is selected or if is loading
  const isDisabled = selectedFile === null || loading

  function validFileType(file) {
    return fileTypes.includes(file.type)
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file && validFileType(file)) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const url = form.current.action
    const formData = new FormData(form.current)

    const fetchOptions = {
      method: form.current.method,
      body: formData
    }

    try {
      setLoading(true)
      const response = await fetch(url, fetchOptions)
      if (!response.ok) {
        throw new Error('Error uploading image')
      }
      const data = await response.json()
      setOriginalFilename(data.filename)
      setFilename(data.filename)
      setImage(data.dataUrl)
      setOriginalWidth(parseInt(data.width))
      setOriginalHeight(parseInt(data.height))
      setWidth(parseInt(data.width))
      setHeight(parseInt(data.height))
      setSelectedFile(null)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.uploadform}>
      <form
        className={styles.form}
        ref={form}
        action='/api/image/upload'
        method='POST'
        encType='multipart/form-data'
      >
        <label htmlFor='file'>Choose an image</label>
        <input
          type='file'
          name='image'
          id='file'
          accept='images/*'
          onChange={handleFileChange}
        />
        <button
          className={`${styles.uploadBtn} ${isDisabled ? styles.disabled : ''}`}
          type='submit'
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default UploadForm
