import React, { Component } from 'react'

import Nav from '../components/Nav'
import CartItem from '../components/CartItem'
import BillingForm from '../components/BillingForm'
import ShippingForm from '../components/ShippingForm'


import { ProductContext } from '../providers/ProductProvider'

export default class Checkout extends Component {
  static contextType = ProductContext
  render() {
    var { cart, subtotal, products } = this.context
    return (
      <>
        <div id='container'>
          <Nav />
          <div className='checkout-container'>
            <h1>Checkout</h1>
            <h2>Shopping Cart</h2>
            {Object.entries(cart).map(([id, quantity]) => {
              if (quantity > 0) {
                return (
                  <CartItem
                    key={id}
                    quantity={quantity}
                    product={products[id]}
                    id={id}
                  />
                )
              } else {
                return <>Your shopping cart is empty :(</>
              }
            })}
            <div id='subtotal'>
              Subtotal: <div>${subtotal}</div>
            </div>
            <ShippingForm />
            <BillingForm />
            <button id='checkout-btn'>Checkout</button>
          </div>
        </div>
      </>
    )
  }
}
