import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// a generic and reusuable way to show the remote app through the host app like this
const MarketingApp = () => {
  const ref = useRef(null) // create a refenerce to an html element to render MarketingApp instance into the div screen
  const history = useHistory()

  useEffect(() => { // add 2nd arg to pass down to child app as callback function
    // when user clicks on a link in marketing app, we need to sync up the current path of container (from child to parent comm)
    // it gets called auto whenever some navigation occurs inside of marketing app  
    // to figure out where the marketing app navigates to and take that new path to update the current path inside of container
    // the history object in marketing app has listen function which returns location object
    // location object that has info about where the marketing app navigates to with pathname property
    // rename pathname to nextPathname
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        // update the history object inside of the container with whatever the current path that marketing app navigates to
        // to prevent an infinite loop to make a change on the path, make sure the current path of container is not the same as the current path of marketing app
      const { pathname } = history.location
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
        
      }
    })
    console.log(ref.current) 
    history.listen(onParentNavigate) // any changes on Browser history inside container, call this fn auto
  }, [])

  return (
    <div ref={ref} />
  )
}

export default MarketingApp
