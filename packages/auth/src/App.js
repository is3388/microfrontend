import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import React from 'react'
//import { Switch, Route, BrowserRouter } from 'react-router-dom' // use memory history instead of browser history for all remote sub-apps
import { Switch, Route, Router } from 'react-router-dom'
import SignIn from './components/Signin'
import SignUp from './components/Signup'

const generateClassName = createGenerateClassName({
  productionPrefix: 'au' // generate all classname with prefix of au and only affects marketing project
})

const App = ({history, onSignIn}) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
           <Route path='/auth/signin'>
            <SignIn onSignIn={onSignIn} />
          </Route>
           <Route path='/auth/signup'>
            <SignUp onSignIn={onSignIn} />
          </Route>
           <Route path='/' component={SignIn} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}

export default App