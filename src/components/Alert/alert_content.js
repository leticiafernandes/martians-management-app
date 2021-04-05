import React from 'react'
import './alert_content.scss'

function AlertContent(props) {
  const { type = 'info', message } = props
  return message ? (
    <div className='alert'>
      <div className={`alert--${type}`}>{message}</div>
    </div>
  ) : null
}

export default AlertContent
