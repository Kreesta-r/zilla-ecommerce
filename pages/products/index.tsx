import React, { useEffect, useState } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { useRouter } from 'next/router';
import { Layout } from 'lucide-react';

const categories = ['All', 'Men', 'Women', 'Accessories'];

const ProductsPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    }
  }, [category]);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop Collection</h1>
            <p className="mt-2 text-sm text-gray-500">
              {filteredProducts.length} products in {selectedCategory.toLowerCase()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              <Layout className="w-4 h-4" />
              <span>View</span>
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex items-center justify-start border-b border-gray-200">
          {categories.map(cat => (
            <button
              key={cat}
              className={`
                relative px-4 py-4 text-sm font-medium -mb-px
                ${selectedCategory === cat 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'}
                transition-colors duration-200
              `}
              onClick={() => {
                setSelectedCategory(cat);
                router.push(`/products?category=${cat.toLowerCase()}`);
              }}
            >
              {cat}
              <span className="ml-2 text-xs text-gray-400">
                {cat === 'All' 
                  ? `(${products.length})` 
                  : `(${products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length})`
                }
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Active Filters Section */}
      {selectedCategory !== 'All' && (
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            <button
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600"
              onClick={() => {
                setSelectedCategory('All');
                router.push('/products');
              }}
            >
              {selectedCategory}
              <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your category selection or check back later.
          </p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductsPage;