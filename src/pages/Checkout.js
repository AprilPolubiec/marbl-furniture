import React, { Component } from 'react'

//Components
import Nav from '../components/Nav'
import CartItem from '../components/CartItem'
import InjectedBillingForm from '../components/BillingForm'

//Providers
import { ProductContext } from '../providers/ProductProvider'

export default class Checkout extends Component {
  static contextType = ProductContext

  render() {
    var { cart, subtotal, shipping, products, loading } = this.context
    var cartEmpty = true
    return (
      <>
        <div id='container'>
          <Nav />
          <div className='checkout-container'>
            <h1>Checkout</h1>
            <h2>Shopping Cart</h2>
            {loading ? (
              <></>
            ) : (
              <>
                {Object.entries(cart).map(([id, quantity]) => {
                  if (quantity > 0) {
                    cartEmpty = false
                    return (
                      <CartItem
                        key={id}
                        quantity={quantity}
                        product={products[id]}
                        id={id}
                      />
                    )
                  } else {
                    return <></>
                  }
                })}
              </>
            )}
            {cartEmpty ? (
              <h3>Your shopping cart is empty :(</h3>
            ) : (
              <>
                <div className='checkout-price'>
                  Subtotal: <div>${subtotal}</div>
                </div>
                <div className='checkout-price'>
                  Shipping: <div>${shipping}</div>
                </div>
                <div className='checkout-price total'>
                  Total: <div>${subtotal + shipping}</div>
                </div>
              </>
            )}

            <InjectedBillingForm />
          </div>
        </div>
      </>
    )
  }
}
