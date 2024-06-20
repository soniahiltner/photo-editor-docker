import { useImage } from '../../hooks/useImage'
import styles from './NavbarButton.module.css'
import PropTypes from 'prop-types'

const NavbarButton = ({ isDisabled, operation }) => {
  const {
    setNavbar,
    setResize,
    setConvert,
    setRotate,
    setFlip,
    setAdjust,
    setFrames,
    setCrop,
    setCropAndResize
  } = useImage()
  return (
    <button
      className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
      onClick={() => {
        if (!isDisabled) {
          setNavbar(false)
          switch (operation) {
            case 'Resize':
              setResize(true)
              break
            case 'Convert':
              setConvert(true)
              break
            case 'Adjust':
              setAdjust(true)
              break
            case 'Rotate':
              setRotate(true)
              break
            case 'Flip':
              setFlip(true)
              break
            case 'Frames':
              setFrames(true)
              break
            case 'Crop':
              setCrop(true)
              break
            case 'Crop & Resize':
              setCropAndResize(true)
              break
            default:
              break
          }
        }
      }}
    >
      {operation}
    </button>
  )
}

NavbarButton.propTypes = {
  isDisabled: PropTypes.bool,
  operation: PropTypes.string
}

export default NavbarButton
