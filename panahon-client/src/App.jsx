import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import DashLayout from './layouts/DashLayout.jsx'; // NEW: Dashboard Layout

// Landing Pages
import HomePage from './pages/LandingPages/HomePage.jsx';
import AboutPage from './pages/LandingPages/AboutPage.jsx';
import ArticleListPage from './pages/LandingPages/ArticleListPage.jsx';
import ArticlePage from './pages/LandingPages/ArticlePage.jsx';

// Auth Pages
import SignInPage from './pages/AuthPages/SignInPage.jsx';
import SignUpPage from './pages/AuthPages/SignUpPage.jsx';

// Dashboard Pages (NEW)
import DashboardPage from './pages/DashboardPages/DashboardPage.jsx';
import ReportsPage from './pages/DashboardPages/ReportsPage.jsx';
import UsersPage from './pages/DashboardPages/UsersPage.jsx';

// Error
import NotFoundPage from './pages/NotFoundPage.jsx';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ]
  },
  // NEW: Dashboard Routing Block
  {
    path: '/dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> }, // Loads at /dashboard
      { path: 'reports', element: <ReportsPage /> }, // Loads at /dashboard/reports
      { path: 'users', element: <UsersPage /> },     // Loads at /dashboard/users
    ]
  }
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;