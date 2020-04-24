import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { ProductContext } from '../providers/ProductProvider'

export default class Nav extends Component {
  static contextType = ProductContext
  render() {
    var { handleCartClick } = this.context
    return (
      <div id='navbar'>
        <Link to='/'>
          {' '}
          <div id='logo'>MARBL</div>
        </Link>

        <FontAwesomeIcon icon={faShoppingCart} onClick={handleCartClick}/>
      </div>
    )
  }
}
