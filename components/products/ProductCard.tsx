import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import ToastAlert from './Toast';

const ProductCard = ({ product }) => {
  const [alertType, setAlertType] = useState('success');
  const [showAlert, setShowAlert] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    setShowAlert(true);
    setAlertType('success');
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setAlertType('warning');
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative aspect-square">
        <img
          src={product.images[0] || '/path/to/fallback-image.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Quick Action Buttons - Desktop (Hover) */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-4 hidden md:flex">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleAddToWishlist}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons - Mobile (Always Visible) */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent md:hidden">
          <div className="flex justify-end gap-2">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full shadow-md active:bg-gray-100"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={handleAddToWishlist}
              className="p-2 bg-white rounded-full shadow-md active:bg-gray-100"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
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

      {/* Alert Dialog */}
      {showAlert && (
        <ToastAlert
          product={product}
          onClose={() => setShowAlert(false)}
          type={alertType}
        />
      )}
    </div>
  );
};

export default ProductCard;