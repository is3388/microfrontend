import React from 'react'
import MarketingApp from './components/MarketingApp'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co' // generate all classname with prefix of ma and only affects marketing project
})

const App = () => {
  return (
    <BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
    <div>
      <Header />
      <MarketingApp />
    </div>
    </StylesProvider>
    </BrowserRouter>
    
  )
}

export default App