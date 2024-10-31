import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, X } from 'lucide-react';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';
import { products } from '@/data/products';

interface User {
  id?: number; 
}


interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string; 
  type?: string;
 
}
interface CartStore {  
  items: Product[]; 
}

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults]   
 = useState<Product[]>([]);
 const { items } = useCartStore() as CartStore;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll',   
 handleScroll);
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product: Product) => {
      const searchTerm = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.category   
 && product.category.toLowerCase().includes(searchTerm)) ||
        (product.type && product.type.toLowerCase().includes(searchTerm))
      );
    });

    setSearchResults(filtered);
  };


  return (
    <header
      className={`fixed top-0 w-full h-16 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className={`text-3xl font-extrabold ${scrolled ? 'text-gray-700' : 'text-white'}`}>
              Zella
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/products?category=men"
              className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-600`}
            >
              Men
            </Link>
            <Link
              href="/products?category=women"
              className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-600`}
            >
              Women
            </Link>
            <Link
              href="/products?category=accessories"
              className={`${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gray-600`}
            >
              Accessories
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`${
                  scrolled ? 'text-gray-800' : 'text-white'
                } p-2 hover:bg-gray-400 rounded-full`}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
              
              {/* Search Input and Results */}
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
                    
                    {/* Search Results */}
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
                    
                    {/* No Results Message */}
                    {searchQuery && searchResults.length === 0 && (
                      <div className="p-3 text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/cart"
              className={`${
                scrolled ? 'text-gray-800' : 'text-white'
              } p-2 hover:bg-gray-400 rounded-full relative`}
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-2 py-1 transform translate-x-1/2 -translate-y-1/2">
                  {items.length}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className={`${
                scrolled ? 'text-gray-800 ' : 'text-white'
              } p-2  hover:bg-gray-400 rounded-full`}
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;