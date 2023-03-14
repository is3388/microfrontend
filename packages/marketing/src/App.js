import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import React from 'react'
//import { Switch, Route, BrowserRouter } from 'react-router-dom' // use memory history instead of browser history for all remote sub-apps
import { Switch, Route, Router } from 'react-router-dom'
import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma' // generate all classname with prefix of ma and only affects marketing project
})

const App = ({history}) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path='/pricing' component={Pricing} exact />
            <Route path='/' component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}

export default App