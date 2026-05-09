import { useEffect, useMemo, useRef, useState } from 'react'
import { FilterSidebar } from '../components/FilterSidebar'
import { Loader } from '../components/Loader'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { useDebounce } from '../hooks/useDebounce'
import { getAllProducts, getCategories, getProducts } from '../services/api'
import { useShopStore } from '../store/useShopStore'
import type { Product } from '../types/product'

const pageSize = 12

export function ProductsPage() {
  const filters = useShopStore((state) => state.filters)
  const setFilters = useShopStore((state) => state.setFilters)
  const resetFilters = useShopStore((state) => state.resetFilters)
  const searchQuery = useShopStore((state) => state.searchQuery)
  const setSearchQuery = useShopStore((state) => state.setSearchQuery)

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(searchQuery)
  const listTopRef = useRef<HTMLDivElement | null>(null)
  const hasMounted = useRef(false)

  useEffect(() => {
    async function bootstrap() {
      try {
        const [initialProducts, categoryList] = await Promise.all([getAllProducts(), getCategories()])
        setAllProducts(initialProducts)
        setCategories(categoryList)
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      return
    }

    async function runSearch() {
      setLoading(true)
      try {
        const result = await getProducts({ q: debouncedSearch, limit: 100, skip: 0 })
        setAllProducts(result.products)
      } finally {
        setLoading(false)
      }
    }

    runSearch()
  }, [debouncedSearch])

  useEffect(() => {
    if (debouncedSearch.trim()) {
      return
    }

    async function restoreDefault() {
      const products = await getAllProducts()
      setAllProducts(products)
    }

    restoreDefault()
  }, [debouncedSearch])

  const filtered = useMemo(() => {
    const items = allProducts
      .filter((product) => (filters.category === 'all' ? true : product.category === filters.category))
      .filter((product) => product.price >= filters.minPrice && product.price <= filters.maxPrice)
      .filter((product) => product.rating >= filters.minRating)
      .filter((product) => product.discountPercentage >= filters.minDiscount)
      .filter((product) => (filters.inStockOnly ? product.stock > 0 : true))

    const sorted = [...items]
    switch (filters.sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        sorted.sort((a, b) => b.discountPercentage - a.discountPercentage)
        break
      default:
        sorted.sort((a, b) => b.id - a.id)
    }

    return sorted
  }, [allProducts, filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pagedProducts = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage(1)
  }, [filters, debouncedSearch])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  const goToPrevPage = () => {
    setPage((value) => (value === 1 ? totalPages : value - 1))
  }

  const goToNextPage = () => {
    setPage((value) => (value === totalPages ? 1 : value + 1))
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl py-10">
      <div className="sticky top-[73px] z-20 mb-6 rounded-3xl border border-zinc-200 bg-white/90 p-4 backdrop-blur">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterSidebar filters={filters} categories={categories} onChange={setFilters} onReset={resetFilters} />

        <section className="space-y-6">
          <div ref={listTopRef} className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Products</h1>
            <p className="text-sm text-zinc-600">{filtered.length} items</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pagedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={totalPages === 1}
                  onClick={goToPrevPage}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={totalPages === 1}
                  onClick={goToNextPage}
                  className="rounded-xl border border-zinc-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
