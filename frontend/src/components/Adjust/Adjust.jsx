import AdjustForm from '../AdjustForm/AdjustForm'
import HeaderEditForm from '../HeaderEditForm/HeaderEditForm'
import styles from './Adjust.module.css'

const Adjust = () => {
  return (
    <div className={styles.container}>
      <HeaderEditForm title='Adjust' />
      <AdjustForm />
    </div>
  )
}

export default Adjust
