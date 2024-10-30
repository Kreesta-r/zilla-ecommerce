import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import useCartStore from '@/store/cartStore';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    alert(`${product.name} has been added to your cart!`); // Alert to inform the user
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image and Quick Actions */}
      <div className="relative aspect-square">
        <img
          src={product.images[0] || '/path/to/fallback-image.jpg'} // Add a fallback image path if no image is available
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Quick Action Buttons - Appear on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleAddToCart} // Use the handleAddToCart function
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              // Placeholder for wishlist functionality
              console.log(`${product.name} added to wishlist!`); 
            }}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <Link href={`/products/${product.id}`} className="block p-4">
        <div className="text-sm text-gray-500 mb-1 capitalize">{product.category}</div>
        <h3 className="font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-1">
            {product.sizes.slice(0, 3).map((size) => (
              <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Color Options */}
        <div className="mt-3 flex gap-1">
          {product.colors.map((color) => (
            <div
              key={color}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
