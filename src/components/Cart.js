import React, { Component } from 'react'

import { ProductContext } from '../providers/ProductProvider'

export default class Cart extends Component {
  static contextType = ProductContext

  render() {
    var { products } = this.context
    return (
      <div id='cart'>
        <h3>Shopping Cart</h3>
        {Object.values(products).map((product) => {
          if (product.quantity > 0) {
            return <div>{product.name}</div>
          } else {
            return <></>
          }
        })}
        <button type='button' className='close-btn'>
          x
        </button>
        <button type='button' id='checkout-btn'>
          Checkout
        </button>
      </div>
    )
  }
}
