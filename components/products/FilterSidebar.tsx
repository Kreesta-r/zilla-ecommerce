import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useFilterStore from '@/store/filterStore';
import { products } from '@/data/products';

interface FilterSidebarProps {
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onClose }) => {
  const { filters, setFilter } = useFilterStore();

  const getUniqueValues = (key: string) => {
    const valueMap = new Map();
    products.forEach((product) => {
      const values = Array.isArray(product[key]) ? product[key] : [product[key]];
      values.forEach((value) => {
        if (value) valueMap.set(value.toLowerCase(), value);
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

  const handleCheckboxChange = (categoryId: string, option: string) => {
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

  const isChecked = (categoryId: string, option: string) => {
    const currentFilters = filters[categoryId] || [];
    return currentFilters.some((filter) => filter.toLowerCase() === option.toLowerCase());
  };

  const capitalizeFirst = (str: string) => {
    if (!str) return '';
    if (['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(str.toUpperCase())) {
      return str.toUpperCase();
    }
    if (!isNaN(Number(str))) {
      return str;
    }
    const words = str.split(' ');
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-6">
        <div className="space-y-6">
          {/* Price Range Slider */}
          <div>
            <h3 className="font-medium mb-4 text-sm md:text-base">Price Range</h3>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              value={filters.priceRange || [minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={1}
              onValueChange={(value) => setFilter('priceRange', value)}
              className="w-full"
            />
            <div className="flex justify-between mt-3 text-sm text-gray-600">
              <span>${filters.priceRange?.[0] || minPrice}</span>
              <span>${filters.priceRange?.[1] || maxPrice}</span>
            </div>
          </div>

          {/* Filter Options Accordion */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-4"
          >
            {filterOptions.map((optionGroup) => (
              <AccordionItem
                key={optionGroup.id}
                value={optionGroup.id}
                className="border-b border-gray-200 last:border-0"
              >
                <AccordionTrigger className="text-sm md:text-base font-medium py-3">
                  {optionGroup.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 py-2">
                    {optionGroup.options.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <Checkbox
                          id={`${optionGroup.id}-${option}`}
                          checked={isChecked(optionGroup.id, option)}
                          onCheckedChange={() => handleCheckboxChange(optionGroup.id, option)}
                          className="h-4 w-4"
                          />
                          <label
                            htmlFor={`${optionGroup.id}-${option}`}
                            className="text-sm md:text-base text-gray-700 cursor-pointer"
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
  
            {/* Mobile Apply Button */}
            {onClose && (
              <div className="mt-8 border-t pt-6">
                <Button 
                  className="w-full" 
                  onClick={onClose}
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterSidebar;