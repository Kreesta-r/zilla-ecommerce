import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full h-16 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className={`text-2xl font-bold ${scrolled ? 'text-black' : 'text-white'}`}>Zella</h1>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="/products?category=men" className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-600`}>
              Men
            </Link>
            <Link href="/products?category=women" className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-600`}>
              Women
            </Link>
            <Link href="/products?category=accessories" className={`${scrolled ? 'text-black' : 'text-white'} hover:text-gray-600`}>
              Accessories
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className={`${scrolled ? 'text-black' : 'text-white'} p-2 hover:bg-gray-100 rounded-full`}>
              <Search size={20} />
            </button>
            <Link href="/cart" className={`${scrolled ? 'text-black' : 'text-white'} p-2 hover:bg-gray-100 rounded-full`}>
              <ShoppingCart size={20} />
            </Link>
            <Link href="/login" className={`${scrolled ? 'text-black' : 'text-white'} p-2 hover:bg-gray-100 rounded-full`}>
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
