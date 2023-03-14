import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// a generic and reusuable way to show the remote app through the host app like this
const MarketingApp = () => {
  const ref = useRef(null) // create a refenerce to an html element to render MarketingApp instance into the div screen
  const history = useHistory()

  // this is render by container app
  useEffect(() => { 
    // add 2nd arg onNavigate on mount function as callback function from container to marketing app
    // whenever there is a change on path of marketing app, it calls onNavigate with its current URL back to container
    // the history object in marketing app has listen function which returns location object with pathname property so pass back to container as props
    // rename pathname to nextPathname
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {        
      // to prevent an infinite loop to make a change on the path, make sure the current path of container is not the same as the current path of marketing app
      const { pathname } = history.location // get the path of container to compare with the nextPathname from marketing current path
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
        
      }
    })
    console.log(ref.current) 
    history.listen(onParentNavigate) // detect any changes on the path of Browser history inside container, call this fn auto and pass down that path to marketing
  }, [])

  return (
    <div ref={ref} />
  )
}

export default MarketingApp
