import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

// Define the type for the product based on your context data
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

const BestSeller: React.FC = () => {
  const context = useContext(ShopContext);

  // Check if context is undefined
  if (!context) {
    return <div>No products available</div>;
  }

  const { products } = context; // Destructure products from context
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bestSeller, setBestSeller] = useState<Product[]>([]); // Type the state as an array of Product

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller); // Check if the product is a bestseller
      setBestSeller(bestProduct.slice(0, 5)); // Slice the first 5 bestseller products
    }
  }, [products]); // Add products as a dependency

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'Best'} text2={'Sellers'} />
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, magni voluptates. Explicabo facere reiciendis, illum nihil quasi pariatur ea nisi molestiae ab dolorem magnam quos quae ut, non eos vitae.
        </p>
      </div>
      {/* You can map and display the bestSeller products here */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item) => (
          <div key={item._id}>
            {/* Add ProductItems or other JSX elements to display each product */}
            <img src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
