//Modules
import React, { Component } from 'react'

//Providers
import { ProductContext } from '../providers/ProductProvider'

//Components
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Cart from '../components/Cart'

export default class Home extends Component {
  static contextType = ProductContext

  render() {
    var { loading, products, displayCart } = this.context
    return (
      <div id='container'>
        <Hero />
        {displayCart ? <Cart /> : <></>}
        <div className='product-container'>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {Object.entries(products).map(([id, product]) => {
                return <ProductCard key={id} id={id} product={product} />
              })}
            </>
          )}
        </div>
      </div>
    )
  }
}
