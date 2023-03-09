import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// use mount function to start up react app
const mount = (el) => {
  ReactDOM.render(
    <App />, el
  )
}

// if our app is running in dev mode (see webpack config mode property and find html element with that id)
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_marketing-dev-root')
  if (el) {
    mount(el) // immediately process and execute it in the browser
  }
}

export { mount }
