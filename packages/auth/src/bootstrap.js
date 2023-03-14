import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history' // history is part of react-router-dom
// we want to use memory history for all remote apps instead of letting react-router-dom to create history for us

// use mount function to start up react app
// onNavigate prop comes from container - parent app
const mount = (el, {onNavigate, defaultHistory}) => {
  // will add more code to this file to sync the current state of our history inside marketing with the history object inside of container
  const history = defaultHistory || createMemoryHistory() // use defaultHistory if provided, otherwise create memory history
  
  if (onNavigate) {
  history.listen(onNavigate) // whenever the path changes, it will auto call onNavigate fn to return the current URL to container
}
  ReactDOM.render(
    <App history={history} />, el
  )
  return {
    // return an object that from child app with onParentNavigate function 
    // for communication from container down to marketing app
    // whenever container parent do some navigation, it will call this function
    // pathname from history.location and rename to nextPathname of container
    onParentNavigate({ pathname: nextPathname }) {
      //console.log('container just navigated')
      const { pathname } = history.location // current path of the marketing app

      if (pathname !== nextPathname) {
        history.push(nextPathname) // update the path of marketing matches up with container's current path
      }
    }

  }
}

// if our app is running in dev mode (see webpack config mode property and find html element with that id)
// use Browser history in standalone in DEV
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#_auth-dev-root')
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory( )}) // immediately process and execute it in the browser 
  }
}

export { mount }
