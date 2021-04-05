import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import AlertContent from './alert_content'

const ESCAPE_KEY_CODE = 27
const alertElement = document.getElementById('alert-root')

function Alert({ visible = false }, ref) {
  const [isVisible, setIsVisible] = useState(visible)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')

  const handleEscapeKey = useCallback((key) => {
    if (key.keyCode === ESCAPE_KEY_CODE) setIsVisible(false)
  })

  const handleShow = (message, type) => {
    setMessage(message)
    setType(type)
    setIsVisible(true)
  }

  useEffect(() => {
    if (isVisible) document.addEventListener('keydown', handleEscapeKey)
  }, [handleEscapeKey, isVisible])

  useImperativeHandle(ref, () => ({
    show: (type, message) => handleShow(type, message),
    hide: () => setIsVisible(false),
  }))

  return createPortal(
    isVisible ? <AlertContent message={message} type={type} /> : null,
    alertElement
  )
}

export default forwardRef(Alert)
