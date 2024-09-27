import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

// Define the types for the products (assuming an interface for the product was defined)
interface Product {

  image: string[];

}

const LatestCollection: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    return <div>No products available</div>;
  }

  const { products } = context;

  console.log(products);
  console.log("hi");

  return (
    <div>
      <h1>Latest Collection</h1>

    </div>
  );
}

export default LatestCollection;
