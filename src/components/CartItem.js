import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import { ProductContext } from '../providers/ProductProvider'

export default class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayIncrementers: false,
    }
  }

  static contextType = ProductContext

  increaseQuantity = () => {
    var { increaseQuantity } = this.context
    increaseQuantity(this.props.id)
  }

  decreaseQuantity = () => {
    var { decreaseQuantity } = this.context
    decreaseQuantity(this.props.id)
  }

  render() {
    return (
      <div className='cart-item'>
        <div className='image'>
          <img src={this.props.product.image} alt={this.props.product.name} />
        </div>
        <div>
          <div className='name'>{this.props.product.name}</div>
          <div className='price'>${this.props.product.price}</div>
        </div>
        <div
          className='quantity'
          onMouseEnter={() => {
            this.setState({ displayIncrementers: true })
          }}
          onMouseLeave={() => {
            this.setState({ displayIncrementers: false })
          }}
        >
          {this.state.displayIncrementers ? (
            <FontAwesomeIcon icon={faPlus} onClick={this.increaseQuantity} />
          ) : (
            <></>
          )}
          x{this.props.quantity}
          {this.state.displayIncrementers ? (
            <FontAwesomeIcon icon={faMinus} onClick={this.decreaseQuantity} />
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }
}
