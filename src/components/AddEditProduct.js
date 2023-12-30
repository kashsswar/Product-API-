import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./editProduct.css"

const AddEditProduct = () => {
  const [productName, setProductName] = useState('');

  const [productDescription, setProductDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();  // Use useNavigate

  const handleSave = async () => {
    const productData = {
      name: productName,
      description: productDescription,
    };

    try {
      let response;

      if (id) {
        // Update existing product
        response = await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, productData);
        console.log(`Product updated successfully: ${id}`);
        
      } else {
        // Add new product
        response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, productData);
        console.log(`Product added successfully: ${response.data.product._id}`);
        // console.log(response.headers)
        // console.log(response.status)
      }

      // Redirect back to the product list after saving
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <label htmlFor='productName'>
        Product Name:
        </label>
      
        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <br />
      <label htmlFor='productDescription'>
        Product Description:
        </label>
        <textarea value={productDescription} id="productDescription" onChange={(e) => setProductDescription(e.target.value)} />
      
      <br />
      <button onClick={handleSave}>{id ? 'Update' : 'Save'}</button>
    </div>
  );
};

export default AddEditProduct;
