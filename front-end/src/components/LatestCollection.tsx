import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Make sure the context is imported
import Title from './Title';
import ProductItems from './ProductItems';

// Define the type for the product based on your context data
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[]; // Ensure this is an array of strings for multiple images
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

const LatestCollection: React.FC = () => {
  const context = useContext(ShopContext); // Get the context

  // Handle undefined context
  if (!context) {
    return <div>No products available</div>;
  }

  const { products } = context; // Destructure products from context
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [latestProducts, setLatestProducts] = useState<Product[]>([]); // State to store the latest products

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10)); // Slice the first 10 products
    }
  }, [products]); // Dependency on products

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1="Latest" text2="Collection" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          {/* You can add a subtitle or description here */}
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item) => (
          <ProductItems key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
