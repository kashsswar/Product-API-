import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './productList.css';

const ProductList = () => {
  // State for products, loading status, and error handling
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product edit navigation
  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
    console.log(`Editing product with ID: ${productId}`);
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      // Delete the product
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${productId}`
      );
      console.log('Deleted the product successfully', productId);

      // Update the products list after deletion
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      // Log additional error information if needed
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle page number click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next page click
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handle previous page click
  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h1>Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && products.length === 0 && <p>No products available</p>}

      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Products"
        />
        <ul>
          {currentProducts.map((product) => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>

              <div>
                <button
                  onClick={() => handleEdit(product._id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextClick}
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
          >
            Next
          </button>
        </div>

        {/* Link to add-product page */}
        <Link to="/add-product">
          <button>Add Product</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;