import styles from './HeaderEditForm.module.css'
import { useImage } from '../../hooks/useImage'
import PropTypes from 'prop-types'

const HeaderEditForm = ({ title}) => {

  const { editDone, success, handleClose } = useImage()
  return (
    <div className={styles.header}>
      {success && (
        <button
          className={styles.backButton}
          onClick={handleClose}
        >
          <i className='fa fa-arrow-left'></i>
        </button>
      )}
      <h3 className={styles.title}>{title}</h3>
      {!editDone && !success  && (
        <button
          className={styles.closeButton}
          onClick={handleClose}
        >
          X
        </button>
      )}
    </div>
  )
}

HeaderEditForm.propTypes = {
  title: PropTypes.string.isRequired
}

export default HeaderEditForm