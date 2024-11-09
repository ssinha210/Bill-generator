import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setErrorMessage('Category name cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/add-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]); // Add the new category to the list
        setNewCategory(''); // Clear the input field
        setSuccessMessage('Category added successfully!');
        setErrorMessage(''); // Clear any previous error messages

        // Hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setErrorMessage('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('Error adding category');
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-category/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted category from the state
        setCategories(categories.filter((category) => category._id !== categoryId));
        setSuccessMessage('Category deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="p-4">
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 mb-4 text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <h2 className="text-2xl mb-4">Category List</h2>

      {/* Add New Category Form */}
      <form onSubmit={handleAddCategory} className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Add Category
        </button>
      </form>

      {/* Display Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="border p-4 bg-white shadow-md rounded-lg"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>

              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="bg-red-500 text-white p-2 mt-4 w-full"
              >
                Delete Category
              </button>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/')} // Navigates to the home page
          className="bg-gray-500 text-white p-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default CategoryList;
