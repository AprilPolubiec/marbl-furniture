import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Error from './pages/Error'
import { ProductProvider } from './providers/ProductProvider'

function App() {
  return (
    <Router>
      <ProductProvider>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/:itemid'>
            <ProductDetails />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </ProductProvider>
    </Router>
  )
}

export default App
