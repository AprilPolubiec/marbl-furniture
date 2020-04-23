import React, { Component } from 'react'

import { storage } from '../firebase'

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
    var { updateQuantity } = this.context
    updateQuantity(this.props.id)
  }

  componentDidMount() {
    storage
      .ref(this.props.product.image)
      .getDownloadURL()
      .then((url) => {
        this.setState({ imageURL: url })
      })
  }

  render() {
    return (
      <div
        className='product-card'
        onMouseEnter={() => this.setState({ displayButtons: true })}
        onMouseLeave={() => this.setState({ displayButtons: false })}
      >
        <img alt={this.props.product.name} src={this.state.imageURL}></img>
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
