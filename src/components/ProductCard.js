import React, { Component } from 'react'

import { ProductContext } from '../providers/ProductProvider'

export default class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageURL: '',
      displayButtons: false,
    }
  }

  static contextType = ProductContext
  handleAddToCart = () => {
    var { increaseQuantity, openCart } = this.context
    increaseQuantity(this.props.id)
    openCart()
  }

  render() {
    return (
      <div
        className='product-card'
        onMouseEnter={() => this.setState({ displayButtons: true })}
        onMouseLeave={() => this.setState({ displayButtons: false })}
      >
        <div className='image'>
          <img
            alt={this.props.product.name}
            src={this.props.product.image}
          ></img>
        </div>
        <div className='title'>{this.props.product.name}</div>
        <div className='price'>${this.props.product.price}</div>
        {this.state.displayButtons ? (
          <>
            <button
              type='button'
              className='add-btn'
              onClick={this.handleAddToCart}
            >
              Add to cart
            </button>
            <button type='button' className='details-btn'>
              Details
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    )
  }
}
