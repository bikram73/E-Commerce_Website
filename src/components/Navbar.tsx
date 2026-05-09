import { Heart, Moon, ShoppingCart, Sun } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useShopStore } from '../store/useShopStore'

export function Navbar() {
  const cartCount = useShopStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0))
  const wishlistCount = useShopStore((state) => state.wishlistIds.length)
  const theme = useShopStore((state) => state.theme)
  const toggleTheme = useShopStore((state) => state.toggleTheme)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl transition-colors dark:border-slate-700/70 dark:bg-slate-900/85">
      <nav className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-slate-100">
          Monocart
        </Link>

        <div className="hidden items-center gap-5 text-sm text-zinc-600 dark:text-slate-300 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-zinc-900 dark:text-slate-50' : 'hover:text-zinc-900 dark:hover:text-slate-50'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'text-zinc-900 dark:text-slate-50' : 'hover:text-zinc-900 dark:hover:text-slate-50'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'text-zinc-900 dark:text-slate-50' : 'hover:text-zinc-900 dark:hover:text-slate-50'
            }
          >
            Cart
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-700 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <Link
            to="/products"
            className="relative rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-700 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <Heart className="size-4" />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-zinc-900 px-1.5 text-[10px] text-white dark:bg-slate-100 dark:text-slate-900">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-xl bg-zinc-900 p-2 text-white">
            <ShoppingCart className="size-4" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-blue-600 px-1.5 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
