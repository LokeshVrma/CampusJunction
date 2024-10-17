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


import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
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
            {/* <Route path="/profile" element={<ProtectedRoute element={<UserProfilePage />} />} /> */}
            <Route path='/profile' element={<UserProfilePage />} />
            
            {/* Public Routes */}
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />

            {/* Hire Tutors */}
            <Route path="/hire-tutors" element={<TutorHiringPage />} />

            {/* Lost and Found Services */}
            <Route path="/lost-and-found" element={<LostAndFoundPage />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
