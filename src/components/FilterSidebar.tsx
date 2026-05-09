import type { FilterState } from '../types/product'

type FilterSidebarProps = {
  filters: FilterState
  categories: string[]
  onChange: (value: Partial<FilterState>) => void
  onReset: () => void
}

export function FilterSidebar({ filters, categories, onChange, onReset }: FilterSidebarProps) {
  return (
    <aside className="space-y-5 rounded-3xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">Filters</h3>
        <button type="button" onClick={onReset} className="text-xs text-zinc-500 hover:text-zinc-900">
          Reset
        </button>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="text-zinc-600">Category</span>
        <select
          value={filters.category}
          onChange={(event) => onChange({ category: event.target.value })}
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 outline-none focus:border-zinc-900"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm">
        <span className="text-zinc-600">Max price: ${filters.maxPrice}</span>
        <input
          type="range"
          min={50}
          max={5000}
          step={10}
          value={filters.maxPrice}
          onChange={(event) => onChange({ maxPrice: Number(event.target.value) })}
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="text-zinc-600">Minimum rating: {filters.minRating}</span>
        <input
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={filters.minRating}
          onChange={(event) => onChange({ minRating: Number(event.target.value) })}
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="text-zinc-600">Minimum discount: {filters.minDiscount}%</span>
        <input
          type="range"
          min={0}
          max={35}
          step={1}
          value={filters.minDiscount}
          onChange={(event) => onChange({ minDiscount: Number(event.target.value) })}
        />
      </label>

      <label className="flex items-center justify-between text-sm text-zinc-700">
        <span>Only in stock</span>
        <input
          checked={filters.inStockOnly}
          onChange={(event) => onChange({ inStockOnly: event.target.checked })}
          type="checkbox"
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="text-zinc-600">Sort by</span>
        <select
          value={filters.sortBy}
          onChange={(event) => onChange({ sortBy: event.target.value as FilterState['sortBy'] })}
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 outline-none focus:border-zinc-900"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price low to high</option>
          <option value="price-desc">Price high to low</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>
      </label>
    </aside>
  )
}
