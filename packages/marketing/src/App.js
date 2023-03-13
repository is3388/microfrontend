import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma' // generate all classname with prefix of ma and only affects marketing project
})

const App = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route path='/pricing' component={Pricing} exact />
            <Route path='/' component={Landing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}

export default App