import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { Loader } from '../components/Loader'
import { getProductById } from '../services/api'
import { useShopStore } from '../store/useShopStore'
import type { Product } from '../types/product'

export function WishlistPage() {
  const wishlistIds = useShopStore((state) => state.wishlistIds)
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWishlistProducts() {
      if (wishlistIds.length === 0) {
        setLoading(false)
        return
      }

      try {
        const products = await Promise.all(wishlistIds.map((id) => getProductById(String(id))))
        setWishlistProducts(products)
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [wishlistIds])

  if (loading) {
    return (
      <div className="mx-auto w-[92%] max-w-7xl py-10">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl py-10">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="size-8 fill-red-500 text-red-500" />
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-slate-100">
          My Wishlist
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-3xl border border-zinc-200 bg-white/50 dark:border-slate-700 dark:bg-slate-800/50">
          <Heart className="size-12 text-zinc-300 dark:text-slate-600" />
          <div className="text-center">
            <p className="text-lg font-medium text-zinc-900 dark:text-slate-100">Your wishlist is empty</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
              Add products to your wishlist to see them here
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 rounded-xl bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <section className="space-y-6">
          <p className="text-sm text-zinc-600 dark:text-slate-400">{wishlistProducts.length} items</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
