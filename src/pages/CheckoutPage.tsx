import { useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import { selectCartTotals, useShopStore } from '../store/useShopStore'
import { formatPrice } from '../utils/format'

export function CheckoutPage() {
  const cart = useShopStore((state) => state.cart)
  const clearCart = useShopStore((state) => state.clearCart)
  const totals = selectCartTotals(cart)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card',
  })

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clearCart()
    toast.success('Order placed successfully')
    navigate('/products')
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl py-10">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-zinc-900">Checkout</h1>

      <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Shipping details</h2>

          <label className="grid gap-1 text-sm text-zinc-700">
            Full name
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-900"
            />
          </label>

          <label className="grid gap-1 text-sm text-zinc-700">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-900"
            />
          </label>

          <label className="grid gap-1 text-sm text-zinc-700">
            Phone
            <input
              required
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-900"
            />
          </label>

          <label className="grid gap-1 text-sm text-zinc-700">
            Address
            <textarea
              required
              rows={4}
              value={form.address}
              onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-900"
            />
          </label>

          <label className="grid gap-1 text-sm text-zinc-700">
            Payment method
            <select
              value={form.paymentMethod}
              onChange={(event) => setForm((prev) => ({ ...prev, paymentMethod: event.target.value }))}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none focus:border-zinc-900"
            >
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on delivery</option>
            </select>
          </label>

          <button type="submit" className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white">
            Place order
          </button>
        </form>

        <aside className="h-fit space-y-3 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Order Summary</h2>
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
        </aside>
      </div>
    </div>
  )
}
