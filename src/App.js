// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddEditProduct from './components/AddEditProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddEditProduct />} />
        <Route path="/edit-product/:id" element={<AddEditProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
