# 🛍️ Modern Minimal E-Commerce Website

A premium, responsive e-commerce frontend built with React + TypeScript, powered by the DummyJSON Products API.

This project focuses on a clean and elegant shopping experience inspired by modern brands, with smooth UI transitions, strong visual hierarchy, and production-style architecture.

## ✨ Project Overview

The application delivers a complete frontend shopping flow:

- Discover products from a real API
- Search and filter products in real time
- Open full product details with gallery and specs
- Add items to cart and manage quantities
- Save favorites with wishlist interaction
- Switch between light/dark themes

Design direction:

- Minimal, spacious layout
- Rounded cards and soft surfaces
- Subtle motion and hover states
- Mobile-first responsiveness

## 🚀 Features

### 🏠 Home Page

- Hero section with premium headline and call-to-action
- Featured products grid (API powered)
- Category preview cards
- Promotional banner section
- Newsletter subscription block

### 🛒 Products Page

- Sticky search bar
- Debounced search requests
- Advanced filters:
  - Category
  - Max price
  - Minimum rating
  - Discount percentage
  - In-stock only
- Sorting options:
  - Newest
  - Price low → high
  - Price high → low
  - Rating
  - Discount
- Pagination controls

### 📦 Product Details Page

- Large image preview + thumbnail gallery
- Product metadata (brand, rating, stock, discount)
- Quantity selector
- Add to cart + Buy now actions
- Specifications panel
- Similar products suggestions

### 🧾 Cart Page

- Quantity update controls
- Remove item actions
- Empty cart UI state
- Dynamic price summary:
  - Subtotal
  - Discount
  - Shipping
  - Final total

### 🔧 Global App Capabilities

- Zustand-based global store for:
  - Cart
  - Wishlist
  - Filters
  - Search query
  - Theme state
- Toast notifications for quick feedback
- Route-based page architecture
- Error-safe fallback page (404)

## 🧰 Tech Stack

- ⚛️ React 19
- 🔷 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧭 React Router DOM
- 🌐 Axios
- 🧠 Zustand
- 🎞️ Framer Motion
- 🔔 React Hot Toast
- 🧩 Lucide React (icons)

## 🌍 API Integration

Data source: DummyJSON Products API  
Base URL: https://dummyjson.com

Used endpoints:

- GET /products
- GET /products/search?q=term
- GET /products/:id
- GET /products/categories
- GET /products/category/:category

## 🔐 API Key / Environment Variables

This project currently does not require an API key.

- ✅ No auth token required
- ✅ No .env file required for current DummyJSON usage

If you migrate to a protected/private API in future, create a .env file:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_API_KEY=your_secret_key
```

Then access them with:

```ts
const baseURL = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY
```

## 🗂️ Project Structure

```text
E-Commerce_Website
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public
│   ├── favicon.svg
│   └── icons.svg
└── src
    ├── App.tsx
    ├── App.css
    ├── main.tsx
    ├── index.css
    ├── assets
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components
    │   ├── FilterSidebar.tsx
    │   ├── Footer.tsx
    │   ├── Loader.tsx
    │   ├── Navbar.tsx
    │   ├── ProductCard.tsx
    │   └── SearchBar.tsx
    ├── hooks
    │   └── useDebounce.ts
    ├── layouts
    │   └── MainLayout.tsx
    ├── pages
    │   ├── CartPage.tsx
    │   ├── HomePage.tsx
    │   ├── NotFoundPage.tsx
    │   ├── ProductDetailsPage.tsx
    │   └── ProductsPage.tsx
    ├── services
    │   └── api.ts
    ├── store
    │   └── useShopStore.ts
    ├── types
    │   └── product.ts
    └── utils
        └── format.ts
```

## ⚙️ Getting Started

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## 📜 Available Scripts

- npm run dev → Starts Vite development server
- npm run build → Type checks and builds production bundle
- npm run preview → Serves the built app locally
- npm run lint → Runs ESLint checks

## 🚢 Deployment Notes

- Can be deployed to Vercel, Netlify, GitHub Pages, or any static host
- Configure SPA rewrite rules so client-side routes resolve correctly

## 🛣️ Roadmap Ideas

- Persist cart/wishlist in local storage
- Add dedicated checkout page with form validation
- Sync filters/search to URL params
- Add automated tests for store and page behaviors
- Add accessibility audits and Lighthouse optimization pass
