import React from 'react'
import MarketingApp from './components/MarketingApp'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import AuthApp from './components/AuthApp' 

const generateClassName = createGenerateClassName({
  productionPrefix: 'co' // generate all classname with prefix of ma and only affects marketing project
})

const App = () => {
  return (
    <BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
    <div>
      <Header />
      <Switch>
        <Route path='/auth' component={AuthApp} />  
        <Route path='/' component={MarketingApp} />
      </Switch>
    </div>
    </StylesProvider>
    </BrowserRouter>
    
  )
}

export default App