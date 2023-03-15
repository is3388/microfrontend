import { mount } from 'dashboard/DashboardApp'
import React, { useEffect, useRef } from 'react'

// a generic and reusuable way to show the remote app through the host app like this
const DashboardApp = () => {
  const ref = useRef(null) // create a refenerce to an html element to render AuthApp instance into the div screen
  
  // this is render by container app
  useEffect(() => { 
    mount(ref.current)        
  }, [])

  return (
    <div ref={ref} />
  )
}

export default DashboardApp
