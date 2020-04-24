import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

//Pages
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Error from './pages/Error'
import Checkout from './pages/Checkout'

//Providers
import { ProductProvider } from './providers/ProductProvider'

function App() {
  return (
    <Router>
      <ProductProvider>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/products/:itemid'>
            <ProductDetails />
          </Route>
          <Route exact path='/checkout'>
            <Checkout />
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
