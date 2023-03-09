import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'

// a generic and reusuable way to show the remote app through the host app like this
const MarketingApp = () => {
  const ref = useRef(null) // create a refenerce to an html element to render MarketingApp instance into the div screen
  
  useEffect(() => {
    mount(ref.current)
    console.log(ref.current) 
  }, [])

  return (
    <div ref={ref} />
  )
}

export default MarketingApp
