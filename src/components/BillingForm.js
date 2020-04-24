import React, { Component } from 'react'

import CountryDropdown from './CountryDropdown'

import { isUSState, isCanadianProvince } from '../utils'

export default class BillingForm extends Component {
  render() {
    return (
      <div id='billing-form'>
        <h2>Card details:</h2>
        <div className='form-field'>
          <div className='card-element'>{/* <CardElement /> */}</div>
        </div>
      </div>
    )
  }
}
