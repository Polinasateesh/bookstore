import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import Login from './authantication/Login';
import Register from './authantication/Register';
import NavBar from './components/NavBar'
const App = () => {
  return (
    <Router>
       <NavBar/>
      <Routes>
        <Route path="/" exact element={<Register />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Catalog" exact element={<CatalogPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
