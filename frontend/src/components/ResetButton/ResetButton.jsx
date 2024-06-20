import { useImage } from '../../hooks/useImage'
import styles from './ResetButton.module.css'

const ResetButton = () => {
  const {
    getImage,
    originalFilename,
    handleClose,
    setWidth,
    setHeight,
    originalWidth,
    originalHeight,
    filename
  } = useImage()

  // Disable button if no image is selected
  const isDisabled = filename === '' ? true : false

  //handle click
  const handleClick = () => {
    if (!isDisabled) {
      getImage(originalFilename)
      handleClose()
      setWidth(originalWidth)
      setHeight(originalHeight)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
    >
      Reset
    </button>
  )
}

export default ResetButton