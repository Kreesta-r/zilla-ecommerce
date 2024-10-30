import { create } from 'zustand';

const useFilterStore = create((set) => ({
  filters: {
    productType: [],
    priceRange: [0, 1000],
    size: [],
    color: [],
  },
  setFilter: (filterType, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterType]: value,
      },
    })),
  clearFilters: () =>
    set({
      filters: {
        productType: [],
        priceRange: [0, 1000],
        size: [],
        color: [],
      },
    }),
  filteredProducts: (products) => {
    const { productType, priceRange, size, color } = useFilterStore.getState().filters;

    return products.filter((product) => {
      const inProductType = productType.length === 0 || productType.includes(product.type);
      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const inSize = size.length === 0 || size.some((s) => product.sizes.includes(s));
      const inColor = color.length === 0 || color.some((c) => product.colors.includes(c));

      return inProductType && inPriceRange && inSize && inColor;
    });
  },
}));

export default useFilterStore;