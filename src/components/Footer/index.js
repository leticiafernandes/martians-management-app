import React from 'react'
import './index.scss'

function Footer() {
  return (
    <section className='footer'>
      <img
        src={`${process.env.PUBLIC_URL}/mars512.png`}
        alt='Mars draw'
        width='128'
      />
    </section>
  )
}

export default Footer
