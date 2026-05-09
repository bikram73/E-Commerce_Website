export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags?: string[]
  brand?: string
  sku?: string
  weight?: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
  returnPolicy?: string
  minimumOrderQuantity?: number
  thumbnail: string
  images: string[]
}

export type ProductListResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductsQuery = {
  limit?: number
  skip?: number
  q?: string
  category?: string
}

export type FilterState = {
  category: string
  minPrice: number
  maxPrice: number
  minRating: number
  minDiscount: number
  inStockOnly: boolean
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'newest'
}
