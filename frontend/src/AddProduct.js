import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', price: '', category: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const navigate = useNavigate(); // For "Back to Home" functionality

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch existing products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [successMessage]); // Re-fetch products when a new product is added

  // Handle product form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Product added:', result);
        setProduct({ name: '', price: '', category: '' }); // Clear the form
        setSuccessMessage('Product added successfully!');
      } else {
        setErrorMessage('Failed to add product');
      }
    } catch (error) {
      setErrorMessage('Error adding product');
      console.error('Error:', error);
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/delete-product/${productToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMessage('Product deleted successfully!');
        setShowDeletePopup(false);
      } else {
        setErrorMessage('Failed to delete product');
      }
    } catch (error) {
      setErrorMessage('Error deleting product');
      console.error('Error:', error);
    }
  };

  // Handle open delete confirmation popup
  const openDeletePopup = (productId) => {
    setProductToDelete(productId);
    setShowDeletePopup(true);
  };

  // Handle close delete confirmation popup
  const closeDeletePopup = () => {
    setProductToDelete(null);
    setShowDeletePopup(false);
  };

  // Navigate to the home page
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      
      {/* Product Form */}
      <form onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <label className="block mb-2">Category:</label>
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        
        {/* Product Name */}
        <label className="block mb-2">Product Name:</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="border p-2 mb-4 w-full"
        />
        
        {/* Product Price */}
        <label className="block mb-2">Price:</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white p-2">Add Product</button>
      </form>
      
      {/* Success/Error Messages */}
      {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}

      {/* Loading Spinner */}
      {isLoading && <div className="mt-4 text-blue-500">Loading...</div>}

      {/* Product List */}
      <h2 className="mt-6 text-xl font-bold">Existing Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((prod) => (
            <li key={prod._id} className="mb-4 flex justify-between items-center">
              <div>
                <strong>{prod.name}</strong> - ${prod.price} - {prod.category}
              </div>
              <button
                onClick={() => openDeletePopup(prod._id)}
                className="bg-red-500 text-white p-2 ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this product?</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 mt-4"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeDeletePopup}
              className="bg-gray-300 text-black p-2 mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <button
        onClick={goHome}
        className="bg-gray-300 text-black p-2 mt-4"
      >
        Back to Home
      </button>
    </div>
  );
}

export default AddProduct;
