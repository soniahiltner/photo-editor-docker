import CancelButton from '../CancelButton/CancelButton'
import SaveButton from '../SaveButton/SaveButton'
import styles from './ResultsOptions.module.css'

const ResultsOptions = () => {
  return (
    <div className={styles.btnContainer}>
      <CancelButton />
      <SaveButton />
    </div>
  )
}

export default ResultsOptions
