import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
