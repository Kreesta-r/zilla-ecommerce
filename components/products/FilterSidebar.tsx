import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useFilterStore from '@/store/filterStore';

const FilterSidebar = () => {
  const { filters, setFilter } = useFilterStore();

  const categories = [
    {
      id: 'productType',
      title: 'Product Type',
      options: ['T-Shirt', 'Jeans', 'Shorts', 'Jacket', 'Dress', 'Hoodie', 'Blazer', 'Leggings', 'Pajamas', 'Hat'],
    },
    {
      id: 'size',
      title: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '24', '26', '28', '30', '32', '34', '36'],
    },
    {
      id: 'color',
      title: 'Color',
      options: ['White', 'Black', 'Navy', 'Blue', 'Red', 'Khaki', 'Olive', 'Brown', 'Gray', 'Green', 'Purple', 'Emerald', 'Indigo', 'Pink', 'Yellow'],
    },
  ];

  const handleCheckboxChange = (categoryId, option) => {
    const currentFilters = filters[categoryId] || [];
    const newFilters = currentFilters.map((item) => item.toLowerCase()).includes(option.toLowerCase())
      ? currentFilters.filter((item) => item.toLowerCase() !== option.toLowerCase())
      : [...currentFilters, option];
    setFilter(categoryId, newFilters);
  };

  return (
    <aside className="w-full md:w-72 h-screen bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* Price Range Slider */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={filters.priceRange}
          onValueChange={(value) => setFilter('priceRange', value)}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Filter Categories Accordion */}
      <Accordion type="multiple" className="w-full">
        {categories.map((category) => (
          <AccordionItem value={category.id} key={category.id}>
            <AccordionTrigger className="text-sm font-medium">
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {category.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters[category.id]?.includes(option)}
                      onCheckedChange={() => handleCheckboxChange(category.id, option)}
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default FilterSidebar;