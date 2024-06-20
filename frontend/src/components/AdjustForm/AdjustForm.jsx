import { useCallback, useEffect } from 'react'
import { useImage } from '../../hooks/useImage'
import styles from './AdjustForm.module.css'
import Slider from '../Slider/Slider'
import ResultsOptions from '../ResultsOptions/ResultsOptions'

const AdjustForm = () => {
  const {
    filename,
    setImage,
    brightness,
    lightness,
    hue,
    saturation,
    setBrightness,
    setLightness,
    setHue,
    setSaturation,
    editDone,
    setEditDone,
    setError,
    setLoading
  } = useImage()

  const url = `/api/image/adjust/${filename}`

  // handle change values
  const handleChangeValues = useCallback((event) => {
    const { name, value } = event.target
    switch (name) {
      case 'brightness':
        setBrightness(parseInt(value))
        break
      case 'lightness':
        setLightness(parseInt(value))
        break
      case 'hue':
        setHue(parseInt(value))
        break
      case 'saturation':
        setSaturation(parseInt(value))
        break
      default:
        break
    }
  }, [setBrightness, setLightness, setHue, setSaturation])

  const handleSubmit = useCallback(async () => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        brightness,
        lightness,
        hue,
        saturation
      })
    }
    setLoading(true)
    try {
      const res = await fetch(url, fetchOptions)
      if (!res.ok) {
        throw new Error('Error adjusting image')
      }
      const data = await res.json()
      setImage(data.dataUrl)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error.message)
      setLoading(false)
    }
  }, [brightness, lightness, hue, saturation, setImage, url, setError, setLoading])

  // handle submit on change
  const handleChange = (event) => {
    handleChangeValues(event)
    setEditDone(true)
  }

  useEffect(() => {
  handleSubmit()
  }, [handleChangeValues, handleSubmit])
  
  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <Slider
          min={-100}
          max={100}
          step={1}
          name='brightness'
          value={brightness}
          onChange={handleChange}
        />
        <Slider
          min={-100}
          max={100}
          step={1}
          name='lightness'
          value={lightness}
          onChange={handleChange}
        />
        <Slider
          min={-180}
          max={180}
          step={1}
          name='hue'
          value={hue}
          onChange={handleChange}
        />
        <Slider
          min={-100}
          max={100}
          step={1}
          name='saturation'
          value={saturation}
          onChange={handleChange}
        />
      </div>
      {editDone && <ResultsOptions />}
    </form>
  )
}

export default AdjustForm
