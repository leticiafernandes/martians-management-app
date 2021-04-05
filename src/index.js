import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.scss'

/** Components */
import App from './components/App/index'
import Store from './components/AppContext/store'

import './stylesheets/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
