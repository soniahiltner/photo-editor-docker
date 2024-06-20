import { useImage } from '../../hooks/useImage'
import styles from './Navbar.module.css'
import NavbarButton from '../NavbarButton/NavbarButton'

const Navbar = () => {
  
  const { filename } = useImage()

  // Disable button if no image is selected
  const isDisabled = filename === '' ? true : false

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <NavbarButton
          isDisabled={isDisabled}
          operation='Resize'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Convert'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Adjust'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Rotate'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Flip'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Frames'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Crop'
        />
        <NavbarButton
          isDisabled={isDisabled}
          operation='Crop & Resize'
        />
      </nav>
    </div>
  )
}

export default Navbar
