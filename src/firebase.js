import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyAZfwiMT9KuUp2LPedHdPexi_dZgvHZ_YI',
  authDomain: 'marbl-furniture.firebaseapp.com',
  databaseURL: 'https://marbl-furniture.firebaseio.com',
  projectId: 'marbl-furniture',
  storageBucket: 'marbl-furniture.appspot.com',
  messagingSenderId: '507184278724',
  appId: '1:507184278724:web:1a363c7b97a6dcda932d91',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage();
export const functions = firebase.functions();
