import styles from './Slider.module.css'
import { useCallback, useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Slider = ({ min, max, value, step, onChange, name }) => {
  const [sliderRange, setSliderRange] = useState(value)
  const sliderRef = useRef(null)

  // handle range slider
  const handleSliderInput = useCallback(() => {
    // get range between max and min values
    const range = max - min
    // get distance between value and min
    const distance = sliderRef.current.value - min
    // turn into percentage
    const percentage = (distance / range) * 100
    // set slider range to percentage
    setSliderRange(parseInt(percentage))
  }, [min, max])

  // Run the function when the slider reference is set
  useEffect(() => {
    handleSliderInput()
  }, [sliderRef, min, max, value, step, onChange, handleSliderInput])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label
          htmlFor={name}
          className={styles.label}
        >
          {name}
        </label>
        <span className={styles.span}>{value}%</span>
      </div>

      <div className={styles.rangeSlider}>
        <div className={styles.sliderContainer}>
          <input
            type='range'
            min={min}
            max={max}
            name={name}
            id={name}
            value={value}
            step={step}
            className={styles.slider}
            ref={sliderRef}
            onInput={handleSliderInput}
            onChange={(value) => onChange(value)}
          />

          <div
            className={styles.sliderThumb}
            style={{ left: `${sliderRange}%` }}
          ></div>
          <div
            className={styles.progress}
            style={{ width: `${sliderRange}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default Slider