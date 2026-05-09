import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { selectCartTotals, useShopStore } from '../store/useShopStore'
import { formatPrice } from '../utils/format'

export function CartPage() {
  const cart = useShopStore((state) => state.cart)
  const removeFromCart = useShopStore((state) => state.removeFromCart)
  const updateQuantity = useShopStore((state) => state.updateQuantity)
  const clearCart = useShopStore((state) => state.clearCart)
  const totals = selectCartTotals(cart)

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-[92%] max-w-2xl flex-col items-center justify-center gap-4 text-center">
        <ShoppingBag className="size-10 text-zinc-400" />
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Your cart is empty</h1>
        <p className="text-sm text-zinc-600">Discover products and add your favorites.</p>
        <Link to="/products" className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Cart</h1>
        <button type="button" onClick={clearCart} className="text-sm text-zinc-500 hover:text-zinc-900">
          Clear cart
        </button>
      </div>

      <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {cart.map((item) => (
            <article key={item.product.id} className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
              <img src={item.product.thumbnail} alt={item.product.title} className="h-28 w-full rounded-2xl object-cover sm:w-36" />
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-medium text-zinc-900">{item.product.title}</h2>
                <p className="text-sm text-zinc-600">{item.product.brand}</p>
                <p className="font-semibold text-zinc-900">{formatPrice(item.product.price)}</p>
                <Link
                  to={`/checkout?itemId=${item.product.id}`}
                  className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Checkout this item
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="p-2"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  className="rounded-xl border border-zinc-200 p-2 text-zinc-600"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit space-y-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Summary</h2>
          <div className="space-y-2 text-sm text-zinc-600">
            <p className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Discount</span>
              <span>-{formatPrice(totals.discount)}</span>
            </p>
            <p className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{formatPrice(totals.shipping)}</span>
            </p>
            <p className="flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </p>
          </div>
          <Link to="/checkout" className="block w-full rounded-2xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white">
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  )
}
