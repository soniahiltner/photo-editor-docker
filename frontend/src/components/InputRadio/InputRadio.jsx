import styles from './InputRadio.module.css'
import PropTypes from 'prop-types'

const InputRadio = ({ name, value, color, onChange, disabled=false }) => {

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type='radio'
        name={name}
        id={value}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      />
      <label
        className={`${styles.label} ${
          name === 'background' ? styles.colorLabel : styles.textLabel
        } `}
        htmlFor={value}
      >
        {name === 'size' && `${value}px`}
        {name === 'ratio' && value}
        {name === 'keepSize' && value}
        {name === 'measure' && value.split('-')[1]}
        {name === 'cropOption' && value}
        {name === 'background' && (
          <div
            className={styles.color}
            style={{ backgroundColor: color }}
          ></div>
        )}
      </label>
    </div>
  )
}

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default InputRadio