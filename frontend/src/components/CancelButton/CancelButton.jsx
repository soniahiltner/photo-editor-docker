import { useImage } from '../../hooks/useImage'
import styles from './CancelButton.module.css'

const CancelButton = () => {
  const { filename, setImage, setWidth, setHeight, setEditDone, handleClose, setLoading, setError } =
    useImage()

  const url = `/api/image/reset/${filename}`

  const resetChanges = async () => {
    setLoading(true)
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Failed to reset changes')
      }
      const data = await res.json()
      setImage(data.dataUrl)
      setWidth(data.width)
      setHeight(data.height)
      setEditDone(false)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error.message)
      setLoading(false)
    }
  }

  //handle click
  const handleClick = async (e) => {
    e.preventDefault()
    resetChanges()
    handleClose()
  }

  return (
    <button
      onClick={handleClick}
      className={styles.button}
    >
      Cancel
    </button>
  )
}

export default CancelButton
