import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/organisms/Layout";
import NotFound from "@/components/pages/NotFound";

// Lazy load all page components
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const ProductsPage = lazy(() => import("@/components/pages/ProductsPage"));
const CategoryPage = lazy(() => import("@/components/pages/CategoryPage"));
const ProductDetailPage = lazy(() => import("@/components/pages/ProductDetailPage"));
const SearchPage = lazy(() => import("@/components/pages/SearchPage"));
const CartPage = lazy(() => import("@/components/pages/CartPage"));
const WishlistPage = lazy(() => import("@/components/pages/WishlistPage"));

// Suspense wrapper with loading spinner
const SuspenseWrapper = ({ children }) => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);

// Main routes configuration
const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <SuspenseWrapper>
        <HomePage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "products",
    element: (
      <SuspenseWrapper>
        <ProductsPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "category/:category",
    element: (
      <SuspenseWrapper>
        <CategoryPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "product/:id",
    element: (
      <SuspenseWrapper>
        <ProductDetailPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "search",
    element: (
      <SuspenseWrapper>
        <SearchPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "cart",
    element: (
      <SuspenseWrapper>
        <CartPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "wishlist",
    element: (
      <SuspenseWrapper>
        <WishlistPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "sale",
    element: (
      <SuspenseWrapper>
        <ProductsPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
  },
];

// Router configuration
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes,
  },
];

export const router = createBrowserRouter(routes);