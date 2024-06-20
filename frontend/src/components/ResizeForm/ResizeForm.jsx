import styles from './ResizeForm.module.css'
import PropTypes from 'prop-types'

const ResizeForm = ({ handleSubmit, handleWidthChange, handleHeightChange, width, height, span }) => {
  

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputs}>
        <div className={styles.input}>
          <label htmlFor='width'>
            Width<span>({span})</span>
          </label>
          <input
            id='width'
            type='number'
            value={width}
            onChange={handleWidthChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor='height'>
            Height<span>({span})</span>
          </label>
          <input
            id='height'
            type='number'
            value={height}
            onChange={handleHeightChange}
          />
        </div>
      </div>
      <button
        className={styles.submitButton}
        type='submit'
      >
        Resize
      </button>
    </form>
  )
}

ResizeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleWidthChange: PropTypes.func.isRequired,
  handleHeightChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  span: PropTypes.string.isRequired
}

export default ResizeForm
