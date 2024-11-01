import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useFilterStore from '@/store/filterStore';
import { products } from '@/data/products';

interface Filter {  
  productType: string[];  
  size: string[];  
  priceRange: [number, number];  
}  

interface FilterOption {  
  id: string;  
  title: string;  
  options: string[];  
}  
  
interface Product {  
  id: number;  
  name: string;  
  price: number;  
  type: string;  
  sizes: string[];  
} 

const FilterSidebar: React.FC = () => {  
  const { filters, setFilter } = useFilterStore() as { filters: Filter; setFilter: (key: string, value: number[]) => void };  

  const getUniqueValues = (key) => {
    const valueMap = new Map();
    products.forEach((product) => {
      const values = Array.isArray(product[key]) ? product[key] : [product[key]];
      values.forEach((value) => {
        valueMap.set(value.toLowerCase(), value); 
      });
    });
    return Array.from(valueMap.values()).sort();
  };

  const productTypes = getUniqueValues('type');
  const allSizes = getUniqueValues('sizes');

  const filterOptions = [
    {
      id: 'productType',
      title: 'Product Type',
      options: productTypes,
    },
    {
      id: 'size',
      title: 'Size',
      options: allSizes,
    },
  ];

  // Find min and max prices
  const prices = products.map((product) => product.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  const handleCheckboxChange = (categoryId, option) => {
    const currentFilters = filters[categoryId] || [];
    const normalizedCurrentFilters = currentFilters.map((f) => f.toLowerCase());
    const normalizedOption = option.toLowerCase();

    let newFilters;
    if (normalizedCurrentFilters.includes(normalizedOption)) {
      newFilters = currentFilters.filter((item) => item.toLowerCase() !== normalizedOption);
    } else {
      newFilters = [...currentFilters, option];
    }

    setFilter(categoryId, newFilters);
  };

  const isChecked = (categoryId, option) => {
    const currentFilters = filters[categoryId] || [];
    return currentFilters.some((filter) => filter.toLowerCase() === option.toLowerCase());
  };

  const capitalizeFirst = (str) => {
    if (!str) return '';
    if (['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(str.toUpperCase())) {
      return str.toUpperCase();
    }
    if (!isNaN(str)) {
      return str;
    }
    const words = str.split(' ');
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const filteredProducts = products.filter((product) => {
    const matchesProductType =
      filters.productType.length === 0 || filters.productType.includes(product.type);
    const matchesSize =
      filters.size.length === 0 || filters.size.some((size) => product.sizes.includes(size));
    const matchesPrice =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    return matchesProductType && matchesSize && matchesPrice;
  });

  console.log(filteredProducts);

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Price Range Slider */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          defaultValue={[minPrice, maxPrice]}
          value={filters.priceRange || [minPrice, maxPrice]}
          min={minPrice}
          max={maxPrice}
          step={1}
          onValueChange={(value) => setFilter('priceRange', value)}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>${filters.priceRange?.[0] || minPrice}</span>
          <span>${filters.priceRange?.[1] || maxPrice}</span>
        </div>
      </div>

      {/* Filter Options Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {filterOptions.map((optionGroup) => (
          <AccordionItem key={optionGroup.id} value={optionGroup.id}>
            <AccordionTrigger className="text-sm font-medium">
              {optionGroup.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {optionGroup.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${optionGroup.id}-${option}`}
                      checked={isChecked(optionGroup.id, option)}
                      onCheckedChange={() => handleCheckboxChange(optionGroup.id, option)}
                    />
                    <label
                      htmlFor={`${optionGroup.id}-${option}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {capitalizeFirst(option)}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
