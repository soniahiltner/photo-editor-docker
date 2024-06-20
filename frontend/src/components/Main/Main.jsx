import Controls from '../Controls/Controls'
import Image from '../Image/Image'
import styles from './Main.module.css'

const Main = () => {
  return (
    <div className={styles.main}>
      <Controls />
      <Image />
    </div>
  )
}

export default Main