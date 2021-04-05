import React from 'react'

import Header from '../Header'
import Footer from '../Footer/index'
import MainContent from '../MainContent/index'

import './index.scss'

function App() {
  return (
    <div className='app'>
      <Header className='app__header' />
      <MainContent className='app__main' />
      <Footer />
    </div>
  )
}

export default App
