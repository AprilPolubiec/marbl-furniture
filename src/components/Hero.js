import React, { Component } from 'react'
import Nav from './Nav'

export default class Hero extends Component {
  render() {
    return (
      <>
        <Nav />
        <div id='hero'></div>
      </>
    )
  }
}
