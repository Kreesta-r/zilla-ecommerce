import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useFilterStore from '@/store/filterStore';
import { products } from '@/data/products';

const FilterSidebar = () => {
  const { filters, setFilter } = useFilterStore();

  // Extract unique product types, sizes, and colors from products
  const productTypes = [...new Set(products.map(product => product.type.toLowerCase()))];
  const allSizes = [...new Set(products.flatMap(product => product.sizes.map(size => size.toLowerCase())))];
  const allColors = [...new Set(products.flatMap(product => product.colors.map(color => color.toLowerCase())))];

  const filterOptions = [
    {
      id: 'productType',
      title: 'Product Type',
      options: productTypes
    },
    {
      id: 'size',
      title: 'Size',
      options: allSizes
    },
    {
      id: 'color',
      title: 'Color',
      options: allColors
    }
  ];

  // Find min and max prices
  const prices = products.map(product => product.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  const handleCheckboxChange = (categoryId, option) => {
    const currentFilters = filters[categoryId] || [];
    const newFilters = currentFilters.includes(option)
      ? currentFilters.filter(item => item !== option)
      : [...currentFilters, option];
    setFilter(categoryId, newFilters);
  };

  // Capitalize first letter for display
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Price Range Slider */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          defaultValue={[minPrice, maxPrice]}
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
        {filterOptions.map(optionGroup => (
          <AccordionItem key={optionGroup.id} value={optionGroup.id}>
            <AccordionTrigger className="text-sm font-medium">
              {optionGroup.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {optionGroup.options.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${optionGroup.id}-${option}`}
                      checked={(filters[optionGroup.id] || []).includes(option)}
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
