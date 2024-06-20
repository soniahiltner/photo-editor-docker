import CropForm from '../CropForm/CropForm'
import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import styles from './Crop.module.css'

const Crop = () => {
  return (
    <div className={styles.container}>
      <HeaderEditForm title='Crop' />
      <CropForm />
    </div>
  )
}

export default Crop
