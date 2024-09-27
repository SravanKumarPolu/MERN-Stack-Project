import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  console.log(products);
  console.log("hi")
  return (
    <div>LatestCollection
      {/* <img src={product.image[0]} alt={product.name} style={{ width: '200px', height: 'auto' }} /> */}
    </div>
  )
}

export default LatestCollection;