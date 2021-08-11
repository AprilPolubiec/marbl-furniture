import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

// Secure file that is not in source control
const CONFIG  = require('./.config')

const firebaseConfig = CONFIG.firebase

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage();
export const functions = firebase.functions();

if (process.env.NODE_ENV === 'development') {
  if (document.location.hostname === 'localhost') {
    functions.useFunctionsEmulator('http://localhost:5001')
  }
}