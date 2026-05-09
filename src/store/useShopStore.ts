import { create } from 'zustand'
import type { FilterState, Product } from '../types/product'

export type CartItem = {
  product: Product
  quantity: number
}

type ShopState = {
  cart: CartItem[]
  wishlistIds: number[]
  searchQuery: string
  filters: FilterState
  theme: 'light' | 'dark'
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: number) => void
  setSearchQuery: (value: string) => void
  setFilters: (value: Partial<FilterState>) => void
  resetFilters: () => void
  toggleTheme: () => void
}

const defaultFilters: FilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: 5000,
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
  sortBy: 'newest',
}

export const useShopStore = create<ShopState>((set) => ({
  cart: [],
  wishlistIds: [],
  searchQuery: '',
  filters: defaultFilters,
  theme: 'light',
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id)

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        }
      }

      return { cart: [...state.cart, { product, quantity }] }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ cart: [] }),
  toggleWishlist: (productId) =>
    set((state) => {
      const exists = state.wishlistIds.includes(productId)
      return {
        wishlistIds: exists
          ? state.wishlistIds.filter((id) => id !== productId)
          : [...state.wishlistIds, productId],
      }
    }),
  setSearchQuery: (value) => set({ searchQuery: value }),
  setFilters: (value) =>
    set((state) => ({
      filters: { ...state.filters, ...value },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}))

export const selectCartTotals = (cart: CartItem[]) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = cart.reduce(
    (sum, item) => sum + (item.product.price * item.product.discountPercentage * item.quantity) / 100,
    0,
  )
  const shipping = subtotal > 0 ? 12 : 0
  const total = subtotal - discount + shipping

  return { subtotal, discount, shipping, total }
}
