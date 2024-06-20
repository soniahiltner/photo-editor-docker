import styles from './Image.module.css'
import { useImage } from '../../hooks/useImage'
import { useRef } from 'react'
import { Cropper } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import placeholder from '../../assets/placeholder.webp'

const Image = () => {
  const {
    image,
    filename,
    width,
    height,
    crop,
    setCoordinates,
    edit,
    setEdit,
    croppedImage,
    setCroppedImage
  } = useImage()


  const cropperRef = useRef(null)

  const handleCrop = () => {
    if (cropperRef.current) {
      const crop = cropperRef.current.getCoordinates()
      setCoordinates(crop)
      setCroppedImage(cropperRef.current.getCanvas().toDataURL())
      setEdit(true)
    }
  }
  

  return (
    <div className={styles.container}>
      {!crop && (
        <>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={image || placeholder}
              alt='Upload an image'
            />
          </div>
          {filename && (
            <div className={styles.info}>
              {filename} - {width} x {height}
            </div>
          )}
        </>
      )}
      {crop && (
        <div className={styles.container}>
          {!edit && (
            <div className={styles.cropperContainer}>
              <Cropper
                src={image}
                ref={cropperRef}
                className={styles.image}
              />
            </div>
          )}
          {edit && croppedImage && (
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={croppedImage}
                alt='cropped'
              />
            </div>
          )}
          {!edit && (
            <button
              className={styles.submitButton}
              onClick={handleCrop}
            >
              Crop
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Image
