import { Heart, ShoppingBag, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/format'
import { useShopStore } from '../store/useShopStore'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useShopStore((state) => state.addToCart)
  const wishlistIds = useShopStore((state) => state.wishlistIds)
  const toggleWishlist = useShopStore((state) => state.toggleWishlist)

  const inWishlist = wishlistIds.includes(product.id)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white"
    >
      <Link to={`/products/${product.id}`} className="relative block overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
          {product.discountPercentage.toFixed(0)}% OFF
        </span>
      </Link>

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-zinc-500">{product.brand ?? 'Curated'}</p>
          <Link to={`/products/${product.id}`} className="line-clamp-1 text-base font-semibold text-zinc-900">
            {product.title}
          </Link>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-zinc-900">{formatPrice(product.price)}</p>
            <p className="text-xs text-zinc-500">Stock: {product.stock}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`rounded-xl border p-2 transition ${inWishlist ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400'}`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`size-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(product, 1)
                toast.success('Added to cart')
              }}
              className="rounded-xl bg-zinc-900 p-2 text-white transition hover:bg-blue-600"
              aria-label="Add to cart"
            >
              <ShoppingBag className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
