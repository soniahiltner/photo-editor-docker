import { useEffect, useState } from 'react'
import { useImage } from '../../hooks/useImage'
import InputRadio from '../InputRadio/InputRadio'
import ResultsOptions from '../ResultsOptions/ResultsOptions'
import styles from './CropAndResizeForm.module.css'
import { usePostFecht } from '../../hooks/usePostFetch'

const CropAndResizeForm = () => {
  const {
    setImage,
    filename,
    setWidth,
    setHeight,
    editDone,
    setEditDone,
    newWidthValue,
    setNewWidthValue,
    newHeightValue,
    setNewHeightValue,
    newRatio,
    setNewRatio,
    cropOption,
    setCropOption,
    setError,
    setLoading
  } = useImage()

  const [selectWidth, setSelectWidth] = useState(false)
  const [selectHeight, setSelectHeight] = useState(false)

  const ratios = [
    '1:1',
    '4:3',
    '3:4',
    '16:9',
    '9:16',
    '3:2',
    '2:3',
    '5:4',
    '4:5'
  ]

  const cropOptions = ['top', 'bottom', 'left', 'right', 'center']
  const url = `/api/image/cropresize/${filename}`
  const body = {
    newWidthValue,
    newHeightValue,
    cropOption
  }

  const { isError, isLoading, data, postData } = usePostFecht(url, body, 'Error cropping image')

  //handle ratios
  function ratioConverter(ratio, measure, value) {
    const [width, height] = ratio.split(':')
    if (measure === 'new-Width') {
      return Math.round((value * height) / width)
    }
    return Math.round((value * width) / height)
  }

  // handle input changes
  function handleWidthChange(event) {
    setNewWidthValue(event.target.value)
    setNewHeightValue(ratioConverter(newRatio, 'new-Width', event.target.value))
  }

  function handleHeightChange(event) {
    setNewHeightValue(event.target.value)
    setNewWidthValue(ratioConverter(newRatio, 'new-Height', event.target.value))
  }

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    async function fetchData() {
      await postData()
    }
    fetchData()
  }

  // handle data
  useEffect(() => {
    if (data) {
      setImage(data.dataUrl)
      setWidth(data.width)
      setHeight(data.height)
      setEditDone(true)
    }
  }, [data, setImage, setWidth, setHeight, setEditDone])

  // handle loading
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  // handle error
  useEffect(() => {
    if (isError) {
      setError(isError.message)
    }
  }, [isError, setError])



  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choose a new aspect ratio:</legend>
        <div className={styles.ratioInputs}>
          {ratios.map((ratio) => (
            <InputRadio
              key={ratio}
              name='ratio'
              value={ratio}
              onChange={(e) => setNewRatio(e.target.value)}
            />
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Set the width or the height:</legend>
        <div className={styles.sizeInputs}>
          <InputRadio
            name='measure'
            value='new-Width'
            onChange={() => {
              setSelectWidth(true)
              setSelectHeight(false)
            }}
          />
          <InputRadio
            name='measure'
            value='new-Height'
            onChange={() => {
              setSelectWidth(false)
              setSelectHeight(true)
            }}
          />
        </div>
      </fieldset>
      {selectWidth && (
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <label htmlFor='newWidthValue'>
              Width<span>(px)</span>
            </label>
            <input
              id='newWidthValue'
              type='number'
              value={newWidthValue}
              onChange={handleWidthChange}
              required
              autoFocus
            />
          </div>
        </div>
      )}
      {selectHeight && (
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <label htmlFor='newHeightValue'>
              Height<span>(px)</span>
            </label>
            <input
              id='newHeightValue'
              type='number'
              value={newHeightValue}
              onChange={handleHeightChange}
              required
              autoFocus
            />
          </div>
        </div>
      )}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Crop options:</legend>
        <div className={styles.cropInputs}>
          {cropOptions.map((option) => (
            <InputRadio
              key={option}
              name='cropOption'
              value={option}
              onChange={(e) => setCropOption(e.target.value)}
            />
          ))}
        </div>
      </fieldset>
      {!editDone && (
        <button
          className={styles.submitButton}
          type='submit'
        >
          Crop
        </button>
      )}
      {editDone && <ResultsOptions />}
    </form>
  )
}

export default CropAndResizeForm
