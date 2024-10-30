import { ShoppingCart, User, Search } from 'lucide-react';
import Link from 'next/link';

const RouteHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold text-black">Zella</h1>
          </Link>

          {/* Navigation Links */}
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

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-black p-2 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </button>
            <Link href="/cart" className="text-black p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart size={20} />
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
