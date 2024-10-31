import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, X, Menu } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { items } = useCartStore() as CartStore;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        (product.category && product.category.toLowerCase().includes(searchTerm)) ||
        (product.type && product.type.toLowerCase().includes(searchTerm))
      );
    });
    setSearchResults(filtered);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 w-full h-16 z-50 
        transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            className="p-2 z-60 focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X 
                size={24} 
                className={`${scrolled ? 'text-gray-800' : 'text-white'}`} 
              />
            ) : (
              <Menu 
                size={24} 
                className={`${scrolled ? 'text-gray-800' : 'text-white'}`} 
              />
            )}
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className={`
            text-2xl sm:text-3xl font-extrabold tracking-tight
            ${scrolled ? 'text-gray-700' : 'text-white'}
            transition-colors duration-300
          `}>
            Zella
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`
          hidden md:flex space-x-4 lg:space-x-6 
          items-center
        `}>
          {['Men', 'Women', 'Accessories'].map((category) => (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className={`
                ${scrolled ? 'text-gray-800' : 'text-white'} 
                hover:text-gray-600 
                text-sm lg:text-base 
                transition-colors duration-300
                relative
                after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 
                after:bg-current after:transition-all after:duration-300
                hover:after:w-full
              `}
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`
                ${scrolled ? 'text-gray-800' : 'text-white'} 
                p-1 sm:p-2 rounded-full 
                hover:bg-gray-100/20 
                transition-colors duration-300
                focus:outline-none
              `}
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
            
            {isSearchOpen && (
              <div className="
                fixed md:absolute 
                inset-0 md:inset-auto 
                md:right-0 md:mt-2 
                w-full md:w-80 
                bg-white 
                md:rounded-lg 
                shadow-lg 
                overflow-hidden 
                z-50
              ">
                <div className="flex items-center px-4 py-2 md:p-0">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="
                      w-full p-3 border-b 
                      text-sm focus:outline-none 
                      focus:border-blue-500
                    "
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="md:hidden p-2 focus:outline-none"
                    aria-label="Close search"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
                {searchResults.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((product) => (
                      <Link
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="
                          block p-3 
                          hover:bg-gray-100 
                          transition-colors 
                          duration-200
                        "
                        onClick={() => {
                          closeAllMenus();
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
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-sm text-gray-500">No products found</div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className={`
              ${scrolled ? 'text-gray-800' : 'text-white'} 
              p-1 sm:p-2 rounded-full 
              relative 
              hover:bg-gray-100/20 
              transition-colors duration-300
              focus:outline-none
            `}
            aria-label="View cart"
          >
            <ShoppingCart size={20} />
            {items.length > 0 && (
              <span className="
                absolute top-0 right-0 
                bg-red-500 text-white 
                text-[8px] sm:text-[10px] 
                rounded-full 
                px-1 sm:px-2 py-0.5 
                transform translate-x-1/2 -translate-y-1/2
              ">
                {items.length}
              </span>
            )}
          </Link>

          {/* User */}
          <Link
            href="/login"
            className={`
              ${scrolled ? 'text-gray-800' : 'text-white'} 
              p-1 sm:p-2 rounded-full 
              hover:bg-gray-100/20 
              transition-colors duration-300
              focus:outline-none
            `}
            aria-label="Login"
          >
            <User size={20} />
          </Link>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <nav 
            className="
              md:hidden 
              fixed inset-0 top-16 
              bg-white 
              z-40 
              pt-4 
              overflow-y-auto
            "
            onClick={closeAllMenus}
          >
            <div className="container mx-auto px-4">
              {['Men', 'Women', 'Accessories'].map((category) => (
                <Link 
                  key={category}
                  href={`/products?category=${category.toLowerCase()}`} 
                  className="
                    block py-3 
                    text-lg text-gray-800 
                    hover:bg-gray-100 
                    border-b
                    transition-colors 
                    duration-200
                  "
                  onClick={closeAllMenus}
                >
                  {category}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;