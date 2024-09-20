// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ForgotPage from './pages/ForgotPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LostAndFoundPage from './pages/LostAndFoundPage';
import ProductListingPage from './pages/ProductListingPage';
import TutorHiringPage from './pages/TutorHiringPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* <Route path='/forgot' element={<ForgotPage />} /> */}
          
          {/* Buy and Sell Products */}
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />
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
  );
}

export default App;
