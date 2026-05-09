import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-[92%] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Page not found</h1>
      <p className="text-sm text-zinc-600">The page you are looking for does not exist.</p>
      <Link to="/" className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white">
        Back to home
      </Link>
    </div>
  )
}
