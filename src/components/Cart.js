import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { ProductContext } from '../providers/ProductProvider'

import CartItem from './CartItem'
// TODO: need to use local memory instead of state for cart
export default class Cart extends Component {
  static contextType = ProductContext
  cancelCartTimeout = () => {
    var { cartTimeout } = this.context
    if (cartTimeout) {
      clearTimeout(cartTimeout)
    }
  }

  render() {
    var { products, cart, handleCartClick, subtotal, loading } = this.context
    return (
      <div id='cart' onMouseEnter={this.cancelCartTimeout}>
        <h3>Shopping Cart</h3>
        <div id='items-container'>
          {loading ? (
            <></>
          ) : (
            <>
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
                  return <></>
                }
              })}
            </>
          )}
        </div>
        <div className='checkout-price'>
          Subtotal: <div>${subtotal}</div>
        </div>
        <button type='button' className='close-btn' onClick={handleCartClick}>
          x
        </button>
        <Link to='/checkout' id='checkout-btn'>
          Checkout
        </Link>
      </div>
    )
  }
}
