import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

export default class Nav extends Component {
  render() {
    return (
      <div id='navbar'>
        <Link to='/'>
          {' '}
          <div id='logo'>MARBL</div>
        </Link>

        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    )
  }
}
