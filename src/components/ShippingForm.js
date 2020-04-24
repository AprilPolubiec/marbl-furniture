import React, { Component } from 'react'

import CountryDropdown from './CountryDropdown'

import { isUSState, isCanadianProvince } from '../utils'

export default class ShippingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      errors: {
        name: '',
        phone: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
      },
    }
  }

  generateErrorMessages = (name, value) => {
    let errors = this.state.errors
    switch (name) {
      case 'name':
        let nameValid = value.length > 0
        errors[name] = nameValid ? '' : 'Name is required'
        break
      case 'phone':
        let phoneValid = value.length > 0
        errors[name] = phoneValid ? '' : 'Phone is required'
        break
      case 'line1':
        let addressValid = value.length > 0
        errors[name] = addressValid ? '' : 'Address is required'
        break
      case 'city':
        let cityValid = value.length > 0
        errors[name] = cityValid ? '' : 'City is required'
        break
      case 'state':
        let stateValid = true
        if (
          this.state[`${name.substr(0, name.indexOf('State'))}Country`] === 'US'
        ) {
          stateValid = isUSState(value)
        } else if (
          this.state[`${name.substr(0, name.indexOf('State'))}Country`] === 'CA'
        ) {
          stateValid = isCanadianProvince(value)
        }
        errors[name] = stateValid ? '' : 'Invalid state'
        break
      case 'country':
        let countryValid = value.length > 0
        errors[name] = countryValid ? '' : 'Country is required'
        break
      default:
        break
    }

    this.setState({ errors })
  }

  handleChange = (e) => {
    e.preventDefault()
    var { name, value } = e.target
    this.generateErrorMessages(name, value)

    this.setState({
      [name]: value,
    })
  }

  render() {
    var { errors } = this.state
    return (
      <div id='shipping-form'>
        <h2>Shipping Address</h2>
        {/* <div className='form-field'>
          <div className='autofill'>
            <button className='text-button' onClick={this.handleAutofill}>
              Autofill from business information
            </button>
          </div>
        </div> */}
        <div className='form-field'>
          <label htmlFor='name'>
            Name:*{' '}
            {errors.name.length > 0 && (
              <span className='error'>{errors.name}</span>
            )}
          </label>
          <input
            name='name'
            type='text'
            value={this.state.name}
            onChange={this.handleChange}
          ></input>
        </div>
        <div className='form-field'>
          <label htmlFor='phone'>
            Phone:*{' '}
            {errors.phone.length > 0 && (
              <span className='error'>{errors.phone}</span>
            )}
          </label>
          <input
            name='phone'
            type='tel'
            value={this.state.phone}
            onChange={this.handleChange}
          ></input>
        </div>
        <div className='form-field'>
          <label htmlFor='line1'>
            Address Line 1:*{' '}
            {errors.line1.length > 0 && (
              <span className='error'>{errors.line1}</span>
            )}
          </label>
          <input
            name='line1'
            type='text'
            value={this.state.line1}
            onChange={this.handleChange}
          ></input>
        </div>
        <div className='form-field'>
          <label htmlFor='line2'>Address Line 2:</label>
          <input
            name='line2'
            type='text'
            value={this.state.line2}
            onChange={this.handleChange}
          ></input>
        </div>
        <div className='form-field-double'>
          <div className='form-field'>
            <label htmlFor='city'>
              City:*
              {errors.city.length > 0 && (
                <span className='error'>{errors.city}</span>
              )}
            </label>
            <input
              name='city'
              type='text'
              value={this.state.city}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className='form-field'>
            <label htmlFor='state'>
              State/Province:{' '}
              {errors.state.length > 0 && (
                <span className='error'>{errors.state}</span>
              )}
            </label>
            <input
              name='state'
              type='text'
              value={this.state.state}
              onChange={this.handleChange}
            ></input>
          </div>
        </div>
        <div className='form-field'>
          <label htmlFor='country'>
            Country:*{' '}
            {errors.country.length > 0 && (
              <span className='error'>{errors.country}</span>
            )}
          </label>
          <CountryDropdown
            handleChange={this.handleChange}
            value={this.state.country}
          />
        </div>
      </div>
    )
  }
}
