import { useEffect } from 'react'
import styles from './Message.module.css'
import { useImage } from '../../hooks/useImage'
import PropTypes from 'prop-types'

const Message = ({ message }) => {

  const {
    error,
    setError,
    success,
    setSuccess,
    setSuccessMessage,
    setEditDone
  } = useImage()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) {
        setError('')
      }
      if (success) {
        setSuccessMessage('')
        setSuccess(false)
        setEditDone(false)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [setError, error, success, setSuccess, setSuccessMessage, setEditDone])

  return <span className={styles.span}>{message}</span>
}

Message.propTypes = {
  message: PropTypes.string.isRequired
}

export default Message