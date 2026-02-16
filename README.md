# 🛒 Bosta Cart — React E-Commerce Shopping Cart System

A fully functional **shopping cart web application** built using **Next.js , Typescript**, simulating real-world e-commerce cart workflows including **product listing, cart operations, dynamic price calculations, and state management**.

This project demonstrates **production-level frontend architecture**, scalable component structure, and clean business logic.

---

## 🔗 Live Demo

👉 https://bosta-cart.vercel.app  

---

## 📸 Screenshots

<img width="1799" height="1070" alt="Screenshot from 2026-02-16 17-40-36" src="https://github.com/user-attachments/assets/f0050f35-9ad4-4e05-92a3-741908e5824c" />


<img width="1799" height="1070" alt="Screenshot from 2026-02-16 17-40-31" src="https://github.com/user-attachments/assets/5b617741-0010-4dd3-b663-876e37e4d0d7" />


<img width="1866" height="3702" alt="home" src="https://github.com/user-attachments/assets/5b63575a-5ec0-4791-add3-0a8a0265629d" />


<img width="1819" height="1087" alt="1p" src="https://github.com/user-attachments/assets/22e8f87c-d5a6-4180-8365-961da4ad34f7" />


<img width="1819" height="1087" alt="2p" src="https://github.com/user-attachments/assets/6a41496f-7446-4e79-be4d-d0c9e204a9b5" />


<img width="1819" height="1087" alt="3p" src="https://github.com/user-attachments/assets/572dfe77-5582-4711-8dd5-9f485d6c2b5c" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-07-10" src="https://github.com/user-attachments/assets/8d700f27-dea0-47b4-b81f-fb6ca7011291" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-07-27" src="https://github.com/user-attachments/assets/e693bfd9-53f4-4107-a032-fab02a9db8c3" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-07-40" src="https://github.com/user-attachments/assets/94137f04-2ab5-4365-a6aa-ed26d7341957" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-07-53" src="https://github.com/user-attachments/assets/1114f1f0-3a36-4aaa-8a46-eb88b965897f" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-08-16" src="https://github.com/user-attachments/assets/75489aef-f59f-427a-bd0a-b90d7136635d" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-08-26" src="https://github.com/user-attachments/assets/db3201c4-6c2e-43d3-a027-8d7c46b3b852" />


<img width="1819" height="1087" alt="Screenshot from 2026-02-16 17-08-42" src="https://github.com/user-attachments/assets/70fe054c-5827-453a-a6b2-2c9aff7b9b73" />


<img width="488" height="1013" alt="Screenshot from 2026-02-16 17-23-46" src="https://github.com/user-attachments/assets/728fbec6-b716-4b5f-bc84-c69df849dc6a" />


---

## 🚀 Implemented Features

### 🛍 Product Handling
- Product listing display  
- Dynamic product rendering  
- Product cards with image, name,description, rating, and price  
- Add/Remove to cart functionality  
- Add/Remove to wishlist functionality  
- View product details
- Related / similar products
- Featured products
- Deals
- Add product
- Edit product
- Delete product
- Wishlist view
- My products view


### 🔁 Auth
- Login 
- Signup


### 🛒 Cart System
- Add product to cart  
- Remove product from cart  
- Increase product quantity  
- Decrease product quantity  
- Prevent negative quantity  
- Auto-remove item when quantity reaches zero  
- Real-time cart state updates  


### 💰 Pricing Logic
- Dynamic subtotal calculation  
- Per-item total calculation  
- Global cart total calculation  
- Auto-update totals when quantity changes  
- Promo code support (e.g. Save10)  


### 📦 Cart Summary
- Order summary panel  
- Total items count  
- Total cart price  
- Live calculation updates  


### 🧪 Edge Case Handling
- Prevent negative quantities
- Prevent duplicated cart items
- Auto-remove empty items
- Dynamic empty lists UI

### 🧠 Concepts Demonstrated
- Component-driven architecture
- State management
- Business logic separation
- Scalable folder structure
- Real-world cart logic
- Responsive UI


### 📱 Responsive UI
- Mobile-first design  
- Tablet & desktop optimized  
- Flexible grid layout  
- Fully responsive cart layout  


### ⚡ Performance Optimization
- Optimized re-rendering  
- Efficient state updates  
- Component reusability  


### 🧠 State Management
- Centralized cart state  
- Predictable updates  
- Immutable state operations  
- Clear data flow  


### 🧩 UI / UX Enhancements
- Disabled invalid actions  
- Smooth interactions  
- Clean and minimal design  
- Empty cart handling  

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: @tanstack/react-query
- **Forms & Validation**: react-hook-form + Zod
- **HTTP Client**: Axios
- **Animations**: Lottie

### Tools
- Git & GitHub  
- ESLint  

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ (or per your support policy).

```bash
npm install
npm run dev      # Development server — http://localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint
```

---

## 🔧 Environment Variables

Optional; defaults work for local and Vercel.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | App URL (default: Vercel URL or `http://localhost:3000`) |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL (default: `https://fakestoreapi.com`) |
| `NEXT_PUBLIC_SITE_NAME` | Site name (default: `Bosta Cart`) |
| `NEXT_PUBLIC_OG_IMAGE_DEFAULT` | Optional OG image URL for metadata fallback |

Product data comes from **Fake Store API**; locally created products are merged in and persisted.

---

## 📂 Project Structure

```bash
bosta-cart/
├─ app/
│  ├─ layout.tsx           # Root layout: header, footer, providers, global toast
│  ├─ page.tsx             # Landing page (may redirect to products)
│  ├─ loading.tsx          # Global loading fallback
│  ├─ error.tsx            # Global error boundary
│  ├─ not-found.tsx        # Global 404
│  ├─ auth/
│  │  ├─ layout.tsx        # Auth layout (redirects if already authenticated)
│  │  ├─ login/page.tsx    # Login page
│  │  └─ signup/page.tsx   # Signup page
│  ├─ products/
│  │  ├─ page.tsx          # Products listing
│  │  ├─ loading.tsx       # Products page skeleton
│  │  ├─ error.tsx         # Products page error boundary
│  │  ├─ new/page.tsx      # Create product page (form)
│  │  ├─ [id]/page.tsx     # Product details (server + client fetch)
│  │  ├─ [id]/loading.tsx  # Product details skeleton
│  │  └─ edit/
│  │     └─ [id]/page.tsx  # Edit product page (reuses CreateProductForm)
│  ├─ cart/
│  │  ├─ page.tsx          # Cart page
│  │  └─ loading.tsx       # Cart skeleton
│  ├─ wishlist/
│  │  ├─ page.tsx          # Wishlist page
│  │  └─ loading.tsx       # Wishlist skeleton
│  └─ my-products/
│     ├─ page.tsx          # "My products" page (local products only)
│     └─ loading.tsx       # My products skeleton
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx              # Main navigation bar (auth/cart/wishlist/my-products)
│  │  ├─ Footer.tsx              # Global footer
│  │  ├─ ProtectedRoute.tsx      # Client-side auth guard for protected pages
│  │  └─ RedirectIfAuthenticated.tsx
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ LoginForm.tsx
│  │  │  └─ SignupForm.tsx
│  │  ├─ cart/
│  │  │  ├─ CartPageContent.tsx
│  │  │  ├─ CartSummary.tsx
│  │  │  └─ CartItem.tsx
│  │  ├─ product-form/
│  │  │  └─ CreateProductForm.tsx   # Create/edit product form (RHF + Zod)
│  │  ├─ product-list/
│  │  │  ├─ ProductList.tsx
│  │  │  ├─ ProductCard.tsx
│  │  │  ├─ SortAndFilter.tsx
│  │  │  ├─ ProductListSkeleton.tsx
│  │  │  ├─ FeaturedProductsCarousel.tsx
│  │  │  └─ DealsSection.tsx
│  │  ├─ product-detail/
│  │  │  ├─ ProductDetail.tsx
│  │  │  ├─ ProductDetailSkeleton.tsx
│  │  │  └─ RelatedProducts.tsx
│  │  ├─ wishlist/
│  │  │  ├─ WishlistPageContent.tsx
│  │  │  └─ WishlistSkeleton.tsx
│  │  └─ my-products/
│  │     ├─ MyProductsPageContent.tsx
│  │     └─ MyProductsSkeleton.tsx
│  ├─ ui/
│  │  ├─ Button.tsx
│  │  ├─ Card.tsx
│  │  ├─ Input.tsx
│  │  ├─ Textarea.tsx
│  │  ├─ Select.tsx
│  │  ├─ FilterChip.tsx
│  │  ├─ SelectableChip.tsx
│  │  ├─ Pagination.tsx
│  │  ├─ ErrorMessage.tsx
│  │  ├─ Toast.tsx
│  │  ├─ Spinner.tsx
│  │  ├─ StarRating.tsx
│  │  ├─ GlobalFetchingIndicator.tsx
│  │  └─ lotties/
│  │     ├─ LottiePlayer.tsx
│  │     ├─ ShoppingCartAnimation.tsx
│  │     ├─ EmptyCartAnimation.tsx
│  │     ├─ HeartAnimation.tsx
│  │     └─ CheckMarkAnimation.tsx
│
├─ hooks/
│  ├─ useProducts.ts           # Products list (React Query + local merge + pagination)
│  ├─ useProduct.ts            # Single product (API + local fallback)
│  ├─ useCategories.ts         # Product categories (API + local categories)
│  ├─ useCreateProduct.ts      # React Query mutation for create
│  ├─ useCreateProductFlow.ts  # High-level create flow (API + local stores + recent)
│  └─ useMyProductActions.ts   # Update/delete for locally created products
│
├─ lib/
│  ├─ api/
│  │  ├─ client.ts         # Axios instance
│  │  ├─ products.ts       # Fake Store products API wrappers
│  │  ├─ auth.ts           # Auth-related API
│  │  ├─ errors.ts         # Error helpers (getErrorMessage, isApiError)
│  │  └─ getProductServer.ts # Server-side product fetch
│  ├─ stores/
│  │  ├─ authStore.ts
│  │  ├─ cartStore.ts
│  │  ├─ wishlistStore.ts
│  │  ├─ toastStore.ts
│  │  ├─ localProductsStore.ts  # Persisted store for locally added products
│  │  └─ recentProductStore.ts  # In-memory store for the most recently added product
│  ├─ schemas/
│  │  ├─ auth.ts            # Zod schemas for login/signup
│  │  └─ product.ts         # Zod schema for create/edit product
│  ├─ types/
│  │  └─ index.ts           # Shared domain types (Product, CartItem, WishlistItem, ApiError, etc.)
│  ├─ zodResolver.ts        # Custom Zod resolver for react-hook-form
│  ├─ env.ts                # Environment variables (e.g. app URL, site name)
│  └─ constants.ts          # App constants (e.g. ITEMS_PER_PAGE)
│
├─ providers/
│  └─ QueryProvider.tsx     # React Query provider for the app
│
├─ public/
│  └─ icon.svg              # App icon (also used as image fallback)
│
├─ README.md
├─ package.json
├─ next.config.ts
└─ tsconfig.json

---

👩‍💻 Author
Samira Saad
Frontend Developer | Next.js & React Developer

GitHub: https://github.com/samirasaad

Portfolio: https://personal-portfolio-samira-saad.vercel.app
