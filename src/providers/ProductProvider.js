import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

import { db } from '../firebase'

const ProductContext = React.createContext()
const ProductConsumer = ProductContext.Consumer

class ProductProvider extends Component {
  constructor(props) {
    super(props)

    const updateQuantity = (productId) => {
      var products = this.state.products
      products[productId].quantity += 1
      this.setState({ products })
    }

    this.state = {
      products: {},
      loading: true,
      updateQuantity,
    }
  }

  componentDidMount() {
    var products = {}
    db.collection('products')
      .get()
      .then((collectionRef) => {
        collectionRef.docs.forEach((docRef) => {
          var productInfo = docRef.data()
          productInfo.quantity = 0
          products[docRef.id] = productInfo
        })
        this.setState({ products, loading: false })
      })
  }

  render() {
    return (
      <ProductContext.Provider value={this.state}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

// ProductProvider = withRouter(ProductProvider)

export { ProductProvider, ProductConsumer, ProductContext }
