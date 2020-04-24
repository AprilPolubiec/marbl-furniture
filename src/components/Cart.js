import React, { Component } from 'react'

import { ProductContext } from '../providers/ProductProvider'

import CartItem from './CartItem'

export default class Cart extends Component {
  static contextType = ProductContext
  cancelCartTimeout = () => {
    var { cartTimeout } = this.context
    console.log('cancelling cart timeout')
    console.log(cartTimeout)
    if (cartTimeout) {
      console.log('clearing')
      clearTimeout(cartTimeout)
    }
  }
  render() {
    var { products, cart, handleCartClick } = this.context
    return (
      <div id='cart' onMouseEnter={this.cancelCartTimeout}>
        <h3>Shopping Cart</h3>
        <div id='items-container'>
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
        </div>
        <button type='button' className='close-btn' onClick={handleCartClick}>
          x
        </button>
        <button type='button' id='checkout-btn'>
          Checkout
        </button>
      </div>
    )
  }
}
