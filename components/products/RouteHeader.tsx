import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/data/products';
import useCartStore from '@/store/cartStore';
import { ShoppingCart, User } from 'lucide-react';

const RouteHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { items } = useCartStore();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product) => {
      const searchTerm = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
      );
    });

    setSearchResults(filtered);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-black">Zella</h1>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="/products?category=men" className="text-black hover:text-gray-600">
              Men
            </Link>
            <Link href="/products?category=women" className="text-black hover:text-gray-600">
              Women
            </Link>
            <Link href="/products?category=accessories" className="text-black hover:text-gray-600">
              Accessories
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-black p-2 hover:bg-gray-100 rounded-full"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full p-3 border-b text-sm focus:outline-none"
                    />

                    {searchResults.length > 0 && (
                      <div className="max-h-96 overflow-y-auto">
                        {searchResults.map((product) => (
                          <Link
                            href={`/products/${product.id}`}
                            key={product.id}
                            className="block p-3 hover:bg-gray-100"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              setSearchResults([]);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ${product.price}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchQuery && searchResults.length === 0 && (
                      <div className="p-3 text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" className="text-black p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                  {items.length}
                </span>
              )}
            </Link>
            <Link href="/login" className="text-black p-2 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RouteHeader;