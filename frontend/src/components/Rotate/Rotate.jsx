import { useEffect } from 'react'
import { useImage } from '../../hooks/useImage'

import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import styles from './Rotate.module.css'
import { usePostFecht } from '../../hooks/usePostFetch'

const Rotate = () => {
  const {
    filename,
    setImage,
    setWidth,
    setHeight,
    degrees,
    setDegrees,
    setError,
    setLoading
  } = useImage()

  const url = `/api/image/rotate/${filename}`

  const { isError, data, postData, isLoading } = usePostFecht(url, { degrees }, 'Error rotating image')

  // Rotate right
  const rotateRight = () => {
    setDegrees(90)
  }
  // Rotate left
  const rotateLeft = () => {
    setDegrees(-90)
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    async function fetchData() {
      await postData()
    }
    fetchData()
  }

  // Handle response
  useEffect(() => {
    if (data) {
      setImage(data.dataUrl)
      setWidth(data.width)
      setHeight(data.height)
      setDegrees(0)
    }
  }, [data, setImage, setWidth, setHeight, setDegrees])

  // Handle error
  useEffect(() => {
    if (isError) {
      setError(isError.message)
    }
  }, [isError, setError])

  // Handle loading
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <div className={styles.container}>
      <HeaderEditForm title='Rotate' />
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <section className={styles.section}>
          <div className={styles.btnContainer}>
            <button
              type='submit'
              className={styles.button}
              onClick={rotateRight}
            >
              <i className='fa fa-rotate-right'></i>
              Right
            </button>
            <button
              type='submit'
              className={styles.button}
              onClick={rotateLeft}
            >
              <i className='fa fa-rotate-left'></i>
              Left
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}

export default Rotate
