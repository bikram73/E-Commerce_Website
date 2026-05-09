import { Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader } from '../components/Loader'
import { ProductCard } from '../components/ProductCard'
import { getProductById, getProducts } from '../services/api'
import { useShopStore } from '../store/useShopStore'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/format'

export function ProductDetailsPage() {
  const { id = '' } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [similar, setSimilar] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const addToCart = useShopStore((state) => state.addToCart)

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      try {
        const data = await getProductById(id)
        setProduct(data)
        setSelectedImage(data.images[0] ?? data.thumbnail)

        const related = await getProducts({ category: data.category, limit: 8 })
        setSimilar(related.products.filter((item) => item.id !== data.id))
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const specs = useMemo(() => {
    if (!product) {
      return []
    }

    return [
      ['Brand', product.brand ?? 'N/A'],
      ['SKU', product.sku ?? 'N/A'],
      ['Stock', String(product.stock)],
      ['Warranty', product.warrantyInformation ?? 'N/A'],
      ['Shipping', product.shippingInformation ?? 'N/A'],
      ['Return policy', product.returnPolicy ?? 'N/A'],
    ]
  }, [product])

  if (loading || !product) {
    return (
      <div className="mx-auto w-[92%] max-w-7xl py-10">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl space-y-14 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <img src={selectedImage} alt={product.title} className="h-[450px] w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.slice(0, 4).map((image) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-2xl border ${selectedImage === image ? 'border-zinc-900' : 'border-zinc-200'}`}
              >
                <img src={image} alt={product.title} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{product.brand}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">{product.title}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Star className="size-4 fill-amber-400 text-amber-400" /> {product.rating.toFixed(1)}
          </div>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-semibold text-zinc-900">{formatPrice(product.price)}</p>
            <p className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
              {product.discountPercentage.toFixed(0)}% OFF
            </p>
          </div>
          <p className="text-zinc-600">{product.description}</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-zinc-200">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3">
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} className="p-3">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                addToCart(product, quantity)
                toast.success('Added to cart')
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <ShoppingBag className="size-4" /> Add to cart
            </button>
            <Link to="/cart" className="rounded-2xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700">
              Buy now
            </Link>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <h3 className="text-base font-semibold text-zinc-900">Specifications</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {specs.map(([label, value]) => (
                <li key={label} className="flex justify-between gap-3 border-b border-zinc-200 pb-2 last:border-none last:pb-0">
                  <span>{label}</span>
                  <span className="text-right text-zinc-900">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Similar Products</h2>
          <Link to="/products" className="text-sm text-zinc-600 hover:text-zinc-900">
            Explore all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similar.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
