import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import React from 'react'
//import { Switch, Route, BrowserRouter } from 'react-router-dom' // use memory history instead of browser history for all remote sub-apps
import { Switch, Route, Router } from 'react-router-dom'

const generateClassName = createGenerateClassName({
  productionPrefix: 'au' // generate all classname with prefix of au and only affects marketing project
})

const App = ({history}) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
           
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}

export default App