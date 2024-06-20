import { useImage } from '../../hooks/useImage'
import styles from './SaveButton.module.css'

const SaveButton = () => {

  const { filename, setImage, setSuccess, setEditDone, handleClose, setLoading, setError } = useImage()
  const url = `/api/image/edit/${filename}`

  const saveChanges = async () => {
    setLoading(true)
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Failed to save changes')
      }
      const data = await res.json()
      setImage(data.dataUrl)
      setSuccess(true)
      setEditDone(false)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error.message)
      setLoading(false)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    saveChanges()
    handleClose()
  }

  return (
    <div>
      <button
        className={styles.submitButton}
        onClick={handleClick}
      >
        Save
      </button>
    </div>
  )
}

export default SaveButton