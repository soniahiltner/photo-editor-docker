import { useEffect} from 'react'
import { useImage } from '../../hooks/useImage'
import styles from './FramesForm.module.css'
import InputRadio from '../InputRadio/InputRadio'
import ResultsOptions from '../ResultsOptions/ResultsOptions'
import { usePostFecht } from '../../hooks/usePostFetch'

const FramesForm = () => {
  const {
    filename,
    setImage,
    size,
    setSize,
    editDone,
    setEditDone,
    background,
    setBackground,
    keepSize,
    setKeepSize,
    setWidth,
    setHeight,
    setError,
    setLoading,
    width,
    height
  } = useImage()

  const url = `/api/image/frame/${filename}`

  const sizes = ['10', '50', '100', '200', '300', '400', '500', '600']
  const colors = [
    'black',
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange'
  ]
  // sizes not allowed if keepSize is yes
  const invalidSize = (size >= width / 2 || size >= height / 2) && keepSize === 'yes'

  const body = {
    size,
    background,
    keepSize
  }

  const { isError, data, postData, isLoading } = usePostFecht(
    url,
    body,
    'Error applying frame'
  )

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case 'size':
        setSize(value)
        break
      case 'background':
        setBackground(value)
        break
      case 'keepSize':
        setKeepSize(value)
        break
      default:
        break
    }
  }

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (invalidSize) {
      setError('The frame size is too big')
      return
    }
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
      setEditDone(true)
    }
  }, [data, setImage, setWidth, setHeight, setEditDone])

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
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choose a frame size:</legend>
        <div className={styles.inputs}>
          {sizes.map((size) => (
            <InputRadio
              key={size}
              name='size'
              value={size}
              onChange={handleChange}
              disabled={keepSize === 'yes' && (size >= width / 2 || size >= height / 2)}
            />
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choose a color:</legend>
        <div className={styles.inputs}>
          {colors.map((color) => (
            <InputRadio
              key={color}
              name='background'
              value={color}
              color={color}
              onChange={handleChange}
            />
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Keep the original size?</legend>
        <div className={styles.inputs}>
          <InputRadio
            name='keepSize'
            value='yes'
            onChange={handleChange}
          />
          <InputRadio
            name='keepSize'
            value='no'
            onChange={handleChange}
          />
        </div>
      </fieldset>
      {!editDone && (
        <button
          className={styles.submitButton}
          type='submit'
        >
          Apply
        </button>
      )}
      {editDone && <ResultsOptions />}
    </form>
  )
}

export default FramesForm
