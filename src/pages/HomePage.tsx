import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { ProductCard } from '../components/ProductCard'
import { getCategories, getProducts } from '../services/api'
import type { Product } from '../types/product'
import { titleCase } from '../utils/format'

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [featured, categoryList] = await Promise.all([
          getProducts({ limit: 12, skip: 0 }),
          getCategories(),
        ])
        setProducts(featured.products)
        setCategories(categoryList.slice(0, 5))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const highlighted = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 8),
    [products],
  )

  return (
    <div className="space-y-20 pb-16">
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0,transparent_40%),radial-gradient(circle_at_80%_75%,#fde68a_0,transparent_38%)]">
        <div className="mx-auto flex min-h-[78vh] w-[92%] max-w-7xl items-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-6"
          >
            <p className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              Modern Minimal Shopping
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-6xl">
              Discover products that feel intentional, premium, and useful.
            </h1>
            <p className="max-w-xl text-base text-zinc-600 sm:text-lg">
              A clean storefront powered by real API data, tailored for speed and elegant browsing.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/products" className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                Shop Collection
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900">
                Explore Categories <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-7xl space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Featured Products</h2>
            <p className="text-sm text-zinc-600">Best rated and trending items curated for you.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            View all
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlighted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto w-[92%] max-w-7xl space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <p className="text-xs uppercase tracking-widest text-zinc-500">Category</p>
              <p className="mt-2 text-lg font-medium text-zinc-900">{titleCase(category)}</p>
              <Link to="/products" className="mt-4 inline-block text-sm text-zinc-600 hover:text-zinc-900">
                Browse
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-7xl">
        <div className="rounded-3xl bg-zinc-900 px-8 py-14 text-white sm:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Seasonal Drop</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight">Summer Collection 2026</h2>
          <p className="mt-2 text-zinc-300">Up to 40% off selected minimal designs.</p>
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-3xl rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Join the newsletter</h2>
        <p className="mt-2 text-sm text-zinc-600">Product drops and exclusive discounts, no spam.</p>
        <form className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Your email"
            className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
          />
          <button type="submit" className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}
