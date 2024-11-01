import React, { useEffect } from 'react';

const ToastAlert = ({ product, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg z-50 max-w-[90vw] md:max-w-md transition-all duration-200 ${
        type === 'success'
          ? 'bg-green-500 text-white'
          : type === 'warning' || type === 'size-warning'
          ? 'bg-yellow-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center space-x-2">
        {type === 'success' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {type === 'warning' && (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
        )}
        {type === 'size-warning' && (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
        )}
        {type === 'error' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <p className="text-xs sm:text-sm md:text-base font-medium">
          {type === 'success'
            ? `Success! ${product.name} has been added to your cart.`
            : type === 'warning'
            ? `${product.name} has been added to your wishlist.`
            : type === 'size-warning'
            ? 'Please select a size.'
            : 'Error: Something went wrong.'}
        </p>
      </div>
    </div>
  );
};

export default ToastAlert;