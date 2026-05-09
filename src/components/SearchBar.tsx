import { Search } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="group relative flex w-full items-center">
      <Search className="pointer-events-none absolute left-4 size-4 text-zinc-500 transition group-focus-within:text-zinc-900" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products, brands, categories"
        className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-zinc-900 focus:bg-white"
      />
    </label>
  )
}
