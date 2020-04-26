const functions = require('firebase-functions')
const stripeKey = require('./.config.json').key
const stripe = require('stripe')(stripeKey)

const admin = require('firebase-admin')
admin.initializeApp()

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  //Stripe amounts are in cents
  var subtotal = data * 100
  var shipping = 795
  const paymentIntent = await stripe.paymentIntents.create({
    amount: subtotal + shipping,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  })
  return paymentIntent
})
