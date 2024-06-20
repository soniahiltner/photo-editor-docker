import FramesForm from '../FramesForm/FramesForm'
import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import styles from './Frames.module.css'

const Frames = () => {
  return (
    <div className={styles.container}>
      <HeaderEditForm title='Frames' />
      <FramesForm />
    </div>
  )
}

export default Frames
