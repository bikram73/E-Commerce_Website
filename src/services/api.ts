import axios from 'axios'
import type { Product, ProductListResponse, ProductsQuery } from '../types/product'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

export async function getProducts(query: ProductsQuery = {}): Promise<ProductListResponse> {
  const { limit = 20, skip = 0, q, category } = query

  if (q) {
    const { data } = await api.get<ProductListResponse>('/products/search', {
      params: { q, limit, skip },
    })
    return data
  }

  if (category && category !== 'all') {
    const { data } = await api.get<ProductListResponse>(`/products/category/${category}`, {
      params: { limit, skip },
    })
    return data
  }

  const { data } = await api.get<ProductListResponse>('/products', {
    params: { limit, skip },
  })
  return data
}

export async function getAllProducts(): Promise<Product[]> {
  const { data } = await api.get<ProductListResponse>('/products', {
    params: { limit: 194, skip: 0 },
  })
  return data.products
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<Array<{ slug?: string; name?: string } | string>>('/products/categories')

  return data.map((entry) => {
    if (typeof entry === 'string') {
      return entry
    }

    return entry.slug ?? entry.name ?? ''
  }).filter(Boolean)
}
