import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => onAddToCart(product)} // Pass the product to the onAddToCart function
        />
      ))}
    </div>
  );
};

export default ProductGrid;
