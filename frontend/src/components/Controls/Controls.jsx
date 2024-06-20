import Navbar from '../Navbar/Navbar'
import Resize from '../Resize/Resize'
import styles from './Controls.module.css'
import Convert from '../Convert/Convert'
import Rotate from '../Rotate/Rotate'
import Flip from '../Flip/Flip'
import Adjust from '../Adjust/Adjust'
import Frames from '../Frames/Frames'
import Crop from '../Crop/Crop'
import { useImage } from '../../hooks/useImage'
import CropAndResize from '../CropAndResize/CropAndResize'

const Controls = () => {

  const {
    navbar,
    resize,
    convert,
    rotate,
    flip,
    adjust,
    cropAndResize,
    crop,
    frames
  } = useImage()
  
  return (
    <div className={styles.controls}>
      <h2 className={styles.title}>Edition tools</h2>
      <div className={styles.formControls}>
        {navbar && <Navbar />}
        {resize && <Resize />}
        {convert && <Convert />}
        {rotate && <Rotate />}
        {flip && <Flip />}
        {adjust && <Adjust />}
        {frames && <Frames />}
        {crop && <Crop />}
        {cropAndResize && <CropAndResize />}
      </div>
    </div>
  )
}

export default Controls