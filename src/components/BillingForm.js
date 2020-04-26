import React, { Component } from 'react'

//Stripe
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js'

//Components
import CountryDropdown from './CountryDropdown'

//Utils
import { isUSState, isCanadianProvince } from '../utils'
import Swal from 'sweetalert2'

class BillingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'US',
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

  validForm = () => {
    let valid = true

    //Make sure no fields were left empty
    Object.entries(this.state).forEach(([key, value]) => {
      this.generateErrorMessages(key, value)
    })

    Object.values(this.state.errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    )

    return valid
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validForm()) {
      const { stripe, elements } = this.props

      stripe
        .createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        })
        .then((result) => {
          console.log(result)
          if (result.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: result.error.message,
            })
          } else {
            console.log(result.paymentMethod)
          }
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Invalid fields. Please try again.',
      })
    }
  }

  render() {
    var { errors } = this.state
    const { stripe } = this.props
    return (
      <div id='billing-form'>
        <h2>Shipping Address</h2>
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
        <h2>Card details:</h2>
        <div className='form-field'>
          <div className='card-element'>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#00000',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          id='checkout-btn'
          onClick={this.handleSubmit}
          disabled={!stripe}
        >
          Checkout
        </button>
      </div>
    )
  }
}

const InjectedBillingForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <BillingForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
)

export default InjectedBillingForm
