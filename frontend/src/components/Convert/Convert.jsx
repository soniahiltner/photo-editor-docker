import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import styles from './Convert.module.css'
import { useImage } from '../../hooks/useImage'
import Slider from '../Slider/Slider'
import Message from '../Messsage/Message'
import { useEffect } from 'react'
import { usePostFecht } from '../../hooks/usePostFetch'

const Convert = () => {
  const {
    setImage,
    filename,
    setFilename,
    success,
    setSuccess,
    setEditDone,
    format,
    setFormat,
    quality,
    setQuality,
    setError,
    setLoading
  } = useImage()

  const url = `/api/image/convert/${filename}`

  const body = {
    format,
    quality
  }

  const { isError,data, postData, isLoading } = usePostFecht(
    url,
    body,
    'Error converting image'
  )

  // handle form submit
  async function handleSubmit(event) {
    event.preventDefault()
    async function fetchData() {
      await postData()
    }
    fetchData()
  }

  // Handle response
  useEffect(() => {
    if (data) {
      setImage(data.dataUrl)
      setFilename(data.newFilename)
      setSuccess(true)
      setEditDone(true)
    }
  }, [data, setImage, setFilename, setSuccess, setEditDone])


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

  // Handle input change
  function handleChange(event) {
    const { name, value } = event.target
    switch (name) {
      case 'format':
        setFormat(value)
        break
      case 'quality':
        setQuality(parseInt(value))
        break
      default:
        break
    }
  }

  return (
    <div className={styles.container}>
      <HeaderEditForm title='Conversion' />
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Select a format:</legend>
          <div className={styles.formatInputs}>
            <div className={styles.inputsItem}>
              <input
                className={styles.input}
                type='radio'
                id='jpeg'
                name='format'
                value='jpeg'
                required
                onChange={handleChange}
              />
              <label
                className={styles.label}
                htmlFor='jpeg'
              >
                JPEG
              </label>
            </div>
            <div className={styles.inputsItem}>
              <input
                className={styles.input}
                type='radio'
                id='png'
                name='format'
                value='png'
                onChange={handleChange}
              />
              <label
                className={styles.label}
                htmlFor='png'
              >
                PNG
              </label>
            </div>
            <div className={styles.inputsItem}>
              <input
                className={styles.input}
                type='radio'
                id='webp'
                name='format'
                value='webp'
                onChange={handleChange}
              />
              <label
                className={styles.label}
                htmlFor='webp'
              >
                WEBP
              </label>
            </div>
            <div className={styles.inputsItem}>
              <input
                className={styles.input}
                type='radio'
                id='tiff'
                name='format'
                value='tiff'
                onChange={handleChange}
              />
              <label
                className={styles.label}
                htmlFor='tiff'
              >
                TIFF
              </label>
            </div>
          </div>
        </fieldset>
        <Slider
          min={0}
          max={100}
          value={quality}
          step={1}
          name='quality'
          onChange={handleChange}
        />
        <button
          className={styles.submitButton}
          type='submit'
        >
          Convert
        </button>
      </form>
      {success && <Message message='Image converted successfully!' />}
      
    </div>
  )
}

export default Convert
