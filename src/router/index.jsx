import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";

// Lazy load page components
const Library = lazy(() => import("@/components/pages/Library"));
const Discover = lazy(() => import("@/components/pages/Discover"));
const Bookmarks = lazy(() => import("@/components/pages/Bookmarks"));
const Settings = lazy(() => import("@/components/pages/Settings"));
const Help = lazy(() => import("@/components/pages/Help"));
const Reader = lazy(() => import("@/components/pages/Reader"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const LoadingFallback = (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-slate-50">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-accent mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={LoadingFallback}>
        <Library />
      </Suspense>
    ),
  },
  {
    path: "discover",
    element: (
      <Suspense fallback={LoadingFallback}>
        <Discover />
      </Suspense>
    ),
  },
  {
    path: "bookmarks",
    element: (
      <Suspense fallback={LoadingFallback}>
        <Bookmarks />
      </Suspense>
    ),
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={LoadingFallback}>
        <Settings />
      </Suspense>
    ),
  },
  {
    path: "help",
    element: (
      <Suspense fallback={LoadingFallback}>
        <Help />
      </Suspense>
    ),
  },
  {
    path: "reader/:bookId",
    element: (
      <Suspense fallback={LoadingFallback}>
        <Reader />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={LoadingFallback}>
        <NotFound />
      </Suspense>
    ),
  },
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes],
  },
];

export const router = createBrowserRouter(routes);