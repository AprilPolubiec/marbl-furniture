import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

export default class Loading extends Component {
  render() {
    return (
      <Loader
        type='Hearts'
        color='#bacba9'
        height={100}
        width={100}
      />
    )
  }
}
