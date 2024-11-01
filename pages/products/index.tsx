import React, { useEffect, useState } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { useRouter } from 'next/router';
import { Layout, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RouteHeader from '@/components/products/RouteHeader';
import FilterSidebar from '@/components/products/FilterSidebar';
import useFilterStore from '@/store/filterStore';
import Footer from '@/components/layout/Footer';

const categories = ['All', 'Men', 'Women', 'Unisex', 'Accessories'];

const ProductsPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { filters, setFilter, clearFilters } = useFilterStore();
  const [alert, setAlert] = useState('');
  const [isDesktop, setIsDesktop] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is our md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (category && typeof category === 'string') {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    }
  }, [category]);

  const getActiveFiltersCount = () => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === 'priceRange') return count;
      return count + (Array.isArray(value) ? value.length : 0);
    }, 0);
  };

  const removeFilter = (filterType, value) => {
    const currentFilters = filters[filterType];
    if (Array.isArray(currentFilters)) {
      setFilter(filterType, currentFilters.filter(item => item !== value));
    }
  };

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory === 'All') return true;
      return product.category && product.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    .filter(product => {
      const price = product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    })
    .filter(product => {
      if (filters.productType.length === 0) return true;
      return filters.productType.includes(product.type);
    })
    .filter(product => {
      if (filters.size.length === 0) return true;
      return filters.size.some(size => product.sizes?.includes(size));
    })
    .filter(product => {
      if (filters.color.length === 0) return true;
      return filters.color.includes(product.color);
    });

  const resetAllFilters = () => {
    clearFilters();
    setSelectedCategory('All');
    router.push('/products');
  };

  const handleAddToCart = (product) => {
    setAlert(`${product.name} has been added to your cart!`);
    setTimeout(() => setAlert(''), 3000);
  };

  return (
    <>
      <RouteHeader />
      {alert && (
        <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow z-50">
          {alert}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shop Collection</h1>
                <p className="mt-2 text-sm text-gray-500">
                  {filteredProducts.length} products in {selectedCategory.toLowerCase()}
                </p>
              </div>
              
              {/* Mobile Filter Button */}
              {!isDesktop && (
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                      {getActiveFiltersCount() > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="ml-1"
                        >
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[70%] sm:w-[380px] p-0">
                    <SheetHeader className="px-6 py-4 border-b">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar onClose={() => setSheetOpen(false)} />
                  </SheetContent>
                </Sheet>
              )}
            </div>

            <nav className="flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-gray-200">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`relative px-4 py-4 text-sm font-medium whitespace-nowrap -mb-px ${
                    selectedCategory === cat 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                  } transition-colors duration-200`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    router.push(`/products?category=${cat.toLowerCase()}`);
                  }}
                >
                  {cat}
                  <span className="ml-2 text-xs text-gray-400">
                    {cat === 'All' 
                      ? `(${products.length})` 
                      : `(${products.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length})`
                    }
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            {isDesktop && (
              <div className="w-full md:w-64 flex-shrink-0">
                <FilterSidebar />
              </div>
            )}

            <div className="flex-1">
              {/* Active Filters */}
              {(selectedCategory !== 'All' || getActiveFiltersCount() > 0) && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetAllFilters}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'All' && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        Category: {selectedCategory}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            setSelectedCategory('All');
                            router.push('/products');
                          }}
                        />
                      </Badge>
                    )}
                    {Object.entries(filters).map(([key, value]) => {
                      if (key === 'priceRange') {
                        if (value[0] > 0 || value[1] < 1000) {
                          return (
                            <Badge
                              key="price"
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              Price: ${value[0]} - ${value[1]}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => setFilter('priceRange', [0, 1000])}
                              />
                            </Badge>
                          );
                        }
                        return null;
                      }
                      return Array.isArray(value) && value.map(item => (
                        <Badge
                          key={`${key}-${item}`}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {key}: {item}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeFilter(key, item)}
                          />
                        </Badge>
                      ));
                    })}
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your filters or check back later.
                  </p>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;