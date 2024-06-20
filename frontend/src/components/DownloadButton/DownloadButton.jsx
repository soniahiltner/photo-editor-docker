import { useImage } from '../../hooks/useImage'
import styles from './DownloadButton.module.css'

const DownloadButton = () => {
  const { downloadImage, filename } = useImage()

  // Disable button if no image is selected
  const isDisabled = filename === '' ? true : false

  const handleClick = () => {
    if (!isDisabled) {
      downloadImage()
    }
  }

  return (
    <div className={styles.download}>
      <button
        className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
        onClick={handleClick}
      >
        Download
      </button>
    </div>
  )
}

export default DownloadButton
