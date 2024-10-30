// store/filterStore.js
import create from 'zustand';

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
      }
    })),
  clearFilters: () =>
    set({
      filters: {
        productType: [],
        priceRange: [0, 1000],
        size: [],
        color: [],
      }
    }),
}));

export default useFilterStore;