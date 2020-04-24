import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

import { db, storage } from '../firebase'

const ProductContext = React.createContext()
const ProductConsumer = ProductContext.Consumer

class ProductProvider extends Component {
  constructor(props) {
    super(props)

    const increaseQuantity = (productId) => {
      var cart = this.state.cart
      if (cart[productId]) {
        cart[productId] += 1
      } else {
        cart[productId] = 1
      }
      calculateSubTotal(cart)
      this.setState({ cart })
    }

    const decreaseQuantity = (productId) => {
      var cart = this.state.cart
      if (cart[productId] > 0) {
        cart[productId] -= 1
      }
      calculateSubTotal(cart)
      this.setState({ cart })
    }

    const handleCartClick = () => {
      this.setState({ displayCart: !this.state.displayCart })
    }

    const closeCart = () => {
      this.setState({ displayCart: false })
    }

    const quickOpenCart = () => {
      this.setState({ displayCart: true })
      var cartTimeout = setTimeout(closeCart, 5000)
      this.setState({ cartTimeout })
    }

    const calculateSubTotal = (cart) => {
      var subtotal = 0
      Object.entries(cart).forEach(([id, quantity]) => {
        var price = this.state.products[id].price
        subtotal += price * quantity
      })
      this.setState({ subtotal })
    }

    this.state = {
      products: {},
      loading: true,
      cart: {},
      subtotal: 0,
      displayCart: false,
      cartTimeout: null,
      increaseQuantity,
      decreaseQuantity,
      quickOpenCart,
      handleCartClick,
    }
  }

  updateImageURL = (id, product) => {
    return new Promise((resolve, reject) => {
      storage
        .ref(product.image)
        .getDownloadURL()
        .then((url) => {
          product.image = url
          resolve({ id, product })
        })
        .catch((error) => reject(error))
    })
  }

  componentDidMount() {
    db.collection('products')
      .get()
      .then((collectionRef) => {
        var downloads = []
        collectionRef.docs.forEach((docRef) => {
          var productInfo = docRef.data()
          // productInfo.quantity = 0
          downloads.push(this.updateImageURL(docRef.id, productInfo))
        })
        Promise.all(downloads).then((results) => {
          var products = {}
          results.forEach((result) => {
            products[result.id] = result.product
          })
          this.setState({ products, loading: false })
        })
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
