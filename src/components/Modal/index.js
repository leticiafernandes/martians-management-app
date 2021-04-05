import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
} from 'react'
import { createPortal } from 'react-dom'
import './index.scss'

const ESCAPE_KEY_CODE = 27
const modalElement = document.getElementById('modal-root')

function Modal({ children, defaultOpened = false }, ref) {
  const [isVisible, setIsVisible] = useState(defaultOpened)

  const handleEscapeKey = useCallback((key) => {
    if (key.keyCode === ESCAPE_KEY_CODE) setIsVisible(false)
  })

  useEffect(() => {
    if (isVisible) document.addEventListener('keydown', handleEscapeKey)
  }, [handleEscapeKey, isVisible])

  useImperativeHandle(ref, () => ({
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
  }))

  return createPortal(
    isVisible ? <div className='modal'>{children}</div> : null,
    modalElement
  )
}

export default forwardRef(Modal)
