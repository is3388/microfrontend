import { mount } from 'auth/AuthApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// a generic and reusuable way to show the remote app through the host app like this
const AuthApp = ({onSignIn}) => {
  const ref = useRef(null) // create a refenerce to an html element to render AuthApp instance into the div screen
  const history = useHistory()

  // this is render by container app
  useEffect(() => { 
    // add 2nd arg onNavigate on mount function as callback function from container to auth app
    // whenever there is a change on path of auth app, it calls onNavigate with its current URL back to container
    // the history object in auth app has listen function which returns location object with pathname property so pass back to container as props
    // rename pathname to nextPathname
    const { onParentNavigate } = mount(ref.current, 
    {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {        
      // to prevent an infinite loop to make a change on the path, make sure the current path of container is not the same as the current path of auth app
      const { pathname } = history.location // get the path of container to compare with the nextPathname from auth current path
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
        
      },
      onSignIn: () => { // callback function to pass down to auth app bootstrap.js as props when user either signin or signup component
        onSignIn();
      },
    })
    console.log(ref.current) 
    history.listen(onParentNavigate) // detect any changes on the path of Browser history inside container, call this fn auto and pass down that path to auth
  }, [])

  return (
    <div ref={ref} />
  )
}

export default AuthApp
