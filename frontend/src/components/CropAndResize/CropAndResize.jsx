import CropAndResizeForm from '../CropAndResizeForm/CropAndResizeForm'
import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import styles from './CropAndResize.module.css'

const CropAndResize = () => {
  return (
    <div className={styles.container}>
      <HeaderEditForm title='Crop & Resize' />
      <CropAndResizeForm />
    </div>
  )
}

export default CropAndResize