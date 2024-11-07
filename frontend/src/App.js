import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LostAndFoundPage from './pages/LostAndFoundPage';
import ProductListingPage from './pages/ProductListingPage';
import TutorHiringPage from './pages/TutorHiringPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import CartPage from './pages/CartPage';
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './components/ProtectedRoute';
import JoinTutorPage from './pages/JoinTutorPage';
import AboutUs from './pages/AboutUs';

import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
              <Route path="/products/create" element={<ProtectedRoute element={<CreateProductPage />} />} />
              <Route path="/products/edit/:id" element={<ProtectedRoute element={<EditProductPage />} />} />
              <Route path='/profile' element={<UserProfilePage />} />
              
              {/* Public Routes */}
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutUs />} />

              {/* Hire Tutors */}
              <Route path="/hire-tutors" element={<TutorHiringPage />} />
              <Route path="/join-as-tutor" element={<JoinTutorPage />} />

              {/* Lost and Found Services */}
              <Route path="/lost-and-found" element={<LostAndFoundPage />} />

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
