import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.scss'

/** Components */
import App from './components/App/index'
import Store from './components/AppContext/store'

/** Functions */
import makeServer from './server/makeServer'

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
} else {
  console.warn("Won't mock server instance")
}

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)
