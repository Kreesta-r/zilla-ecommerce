// components/products/FilterSidebar.js
import { Slider } from '@/components/ui/slider';
import useFilterStore from '@/store/filterStore';

const FilterSidebar = () => {
  const { filters, setFilter } = useFilterStore();

  const productTypes = ["T-Shirts", "Tank Tops", "Shirts", "Pants"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Red", "Blue", "Green"];

  return (
    <div className="w-64 p-4 border-r">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Product Type</h3>
        {productTypes.map((type) => (
          <label key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.productType.includes(type)}
              onChange={(e) => {
                const newTypes = e.target.checked
                  ? [...filters.productType, type]
                  : filters.productType.filter(t => t !== type);
                setFilter('productType', newTypes);
              }}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={filters.priceRange}
          onValueChange={(value) => setFilter('priceRange', value)}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Similar sections for Size and Color */}
    </div>
  );
};

export default FilterSidebar;