import styles from './Resize.module.css'
import { useImage } from '../../hooks/useImage'
import { useEffect, useState } from 'react'
import ResizeForm from '../ResizeForm/ResizeForm'
import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import { usePostFecht } from '../../hooks/usePostFetch'

const Resize = () => {
  const {
    setImage,
    filename,
    originalWidth,
    originalHeight,
    setSuccess,
    setSuccessMessage,
    width,
    setWidth,
    height,
    setHeight,
    newWidth,
    setNewWidth,
    newHeight,
    setNewHeight,
    percentageValue,
    setPercentageValue,
    setEditDone,
    setError,
    setLoading
  } = useImage()

  const url = `/api/image/resize/${filename}`

  // State for navigation
  const [pixel, setPixel] = useState(true)
  const [percentage, setPercentage] = useState(false)

  const body = {
    newWidth,
    newHeight,
    pixel,
    percentage,
    percentageValue
  }

  const { isError, data, postData, isLoading } = usePostFecht(url, body, 'Error resizing image')

  // set initial width and height
  useEffect(() => {
    if (width && height) {
      setNewWidth(width)
      setNewHeight(height)
    } else {
      setNewWidth(originalWidth)
      setNewHeight(originalHeight)
    }
    setPercentageValue(100)
  }, [originalWidth, originalHeight,setPercentageValue, setNewHeight, setNewWidth, height, width])


  // handle input changes
  function handleWidthChange(event) {
    setNewWidth(event.target.value ? parseInt(event.target.value) : '')
    if (width && height) {
      setNewHeight(Math.round(height * (event.target.value / width)))
      setPercentageValue(Math.round((event.target.value / width) * 100))
    } else {
      setNewHeight(
        Math.round(originalHeight * (event.target.value / originalWidth))
      )
      setPercentageValue(Math.round((event.target.value / originalWidth) * 100))
    }
  }

  function handleHeightChange(event) {
    setNewHeight(event.target.value ? parseInt(event.target.value) : '')
    if (width && height) {
      setNewWidth(Math.round(width * (event.target.value / height)))
      setPercentageValue(Math.round((event.target.value / height) * 100))
    } else {
      setNewWidth(
        Math.round(originalWidth * (event.target.value / originalHeight))
      )
      setPercentageValue(Math.round((event.target.value / originalHeight) * 100))
    }
  }

  function handlePercentageChange(event) {
    setPercentageValue(event.target.value ? parseInt(event.target.value) : '')
    if (width && height) {
      setNewWidth(Math.round((width * event.target.value) / 100))
      setNewHeight(Math.round((height * event.target.value) / 100))
    } else {
      setNewWidth(Math.round((originalWidth * event.target.value) / 100))
      setNewHeight(Math.round((originalHeight * event.target.value) / 100))
    }
  }

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    async function fetchData() {
      await postData()
    }
    fetchData()
  }

  // set new image
  useEffect(() => {
    if (data) {
      setImage(data.dataUrl)
      setWidth(data.width)
      setHeight(data.height)
      setEditDone(true)
      setSuccess(true)
      setSuccessMessage('Image resized successfully')
    }
  }, [data, setImage, setWidth, setHeight, setEditDone, setSuccess, setSuccessMessage])

  // set error message
  useEffect(() => {
    if (isError) {
      setError(isError.message)
    }
  }, [isError, setError])

  // set loading
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])
  
  return (
    <div className={styles.container}>
      <HeaderEditForm title='Resize' />
      <nav className={styles.nav}>
        <button
          className={`${styles.button} ${pixel ? styles.active : ''}`}
          onClick={() => {
            setPixel(true)
            setPercentage(false)
          }}
        >
          Pixels
        </button>
        <button
          className={`${styles.button} ${percentage ? styles.active : ''}`}
          onClick={() => {
            setPixel(false)
            setPercentage(true)
          }}
        >
          Percentage
        </button>
      </nav>
      {pixel && (
        <ResizeForm
          handleSubmit={handleSubmit}
          handleWidthChange={handleWidthChange}
          handleHeightChange={handleHeightChange}
          width={newWidth}
          height={newHeight}
          span='px'
        />
      )}
      {percentage && (
        <ResizeForm
          handleSubmit={handleSubmit}
          handleWidthChange={handlePercentageChange}
          handleHeightChange={handlePercentageChange}
          width={percentageValue}
          height={percentageValue}
          span='%'
        />
      )}
      
    </div>
  )
}

export default Resize