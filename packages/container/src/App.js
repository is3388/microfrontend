import React, { lazy, Suspense, useState } from 'react'
//import MarketingApp from './components/MarketingApp'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
//import AuthApp from './components/AuthApp' 
import Progress from './components/Progress'

// to optimize performance use lazy loading only code related to marketing when user tries to show marketing component
const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'co' // generate all classname with prefix of ma and only affects marketing project
})

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
    <div>
      <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn} />
       
      <Suspense fallback={<Progress />}>
      <Switch>
        <Route path='/auth'>  
          <AuthLazy onSignIn={() => setIsSignedIn(true)} />
        </Route>
        <Route path='/' component={MarketingLazy} />      
      </Switch>
      </Suspense>
      
    </div>
    </StylesProvider>
    </BrowserRouter>
    
  )
}

export default App