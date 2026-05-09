import { create } from 'zustand'
import type { FilterState, Product } from '../types/product'

export type CartItem = {
  product: Product
  quantity: number
}

const CART_COOKIE_KEY = 'aurelia_cart'
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30

function readCartFromCookie(): CartItem[] {
  if (typeof document === 'undefined') {
    return []
  }

  const escapedKey = CART_COOKIE_KEY.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedKey}=([^;]*)`))

  if (!match) {
    return []
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') {
        return false
      }

      const candidate = item as CartItem
      return (
        typeof candidate.quantity === 'number' &&
        candidate.quantity > 0 &&
        !!candidate.product &&
        typeof candidate.product.id === 'number'
      )
    })
  } catch {
    return []
  }
}

function writeCartToCookie(cart: CartItem[]) {
  if (typeof document === 'undefined') {
    return
  }

  const encoded = encodeURIComponent(JSON.stringify(cart))
  document.cookie = `${CART_COOKIE_KEY}=${encoded}; path=/; max-age=${CART_COOKIE_MAX_AGE}; SameSite=Lax`
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
  cart: readCartFromCookie(),
  wishlistIds: [],
  searchQuery: '',
  filters: defaultFilters,
  theme: 'light',
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id)
      const nextCart = existing
        ? state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...state.cart, { product, quantity }]

      writeCartToCookie(nextCart)

      return { cart: nextCart }
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const nextCart = state.cart.filter((item) => item.product.id !== productId)
      writeCartToCookie(nextCart)
      return { cart: nextCart }
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const nextCart = state.cart
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0)

      writeCartToCookie(nextCart)
      return { cart: nextCart }
    }),
  clearCart: () => {
    writeCartToCookie([])
    set({ cart: [] })
  },
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
