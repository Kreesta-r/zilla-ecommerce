import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => 
    set((state) => ({
      items: [...state.items, { ...product, quantity: 1 }]
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(item => item.id !== productId)
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    })),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;