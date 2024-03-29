import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

//Stripe
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js'

//Components
import CountryDropdown from './CountryDropdown'

//Utils
import { isUSState, isCanadianProvince, createPaymentIntent } from '../utils'
import Swal from 'sweetalert2'

import { ProductContext } from '../providers/ProductProvider'

class BillingForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'US',
      errors: {
        name: '',
        email: '',
        phone: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
      },
      loading: false,
      redirectHome: false,
    }
  }

  static contextType = ProductContext

  generateErrorMessages = (name, value) => {
    let errors = this.state.errors
    switch (name) {
      case 'name':
        let nameValid = value.length > 0
        errors[name] = nameValid ? '' : 'Name is required'
        break
      case 'email':
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        errors.email = emailValid ? '' : 'Email is invalid'
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
    this.setState({ loading: true })
    if (this.validForm()) {
      const { stripe, elements } = this.props
      var { subtotal } = this.context
      createPaymentIntent(subtotal)
        .then((res) => {
          var paymentIntent = res.data
          // console.log(paymentIntent)
          var {
            name,
            phone,
            email,
            line1,
            line2,
            city,
            state,
            country,
          } = this.state
          return stripe.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                address: {
                  city,
                  country,
                  line1,
                  line2,
                  state,
                },
                email,
                name,
                phone,
              },
            },
          })
        })
        .then((result) => {
          if (result.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: result.error.message,
            })
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              this.setState({ loading: false })
              Swal.fire({
                icon: 'success',
                title: 'Done!',
                text: 'Your order has been processed.',
              }).then((result) => {
                var { clearCart } = this.context
                this.setState({ redirectHome: true })
                clearCart()
              })
            }
          }
        })
    } else {
      this.setState({ loading: false })
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
      <>
        {this.state.redirectHome ? (
          <Redirect to='/' />
        ) : (
          <div id='billing-form'>
            <h2>Shipping Information</h2>
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
              <label htmlFor='email'>
                Email:*{' '}
                {errors.email.length > 0 && (
                  <span className='error'>{errors.email}</span>
                )}
              </label>
              <input
                name='email'
                type='text'
                value={this.state.email}
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
              disabled={!stripe || this.state.loading}
            >
              Checkout
            </button>
          </div>
        )}
      </>
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
