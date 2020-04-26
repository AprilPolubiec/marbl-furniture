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

//Stripe
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_vHvXhiHMzJ9gItR30MYqY24r00S6o1n3bk')
function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
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
      </Elements>
    </Router>
  )
}

export default App
