const functions = require('firebase-functions')
const stripeKey = require('./.config.json').key
const stripe = require('stripe')(stripeKey)

const admin = require('firebase-admin')
admin.initializeApp()

//TODO: won't work unless use is authorized
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  var subtotal = data.subtotal
  var shipping = 7.95
  const paymentIntent = await stripe.paymentIntents.create({
    amount: subtotal + shipping,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  })
  return paymentIntent
})
