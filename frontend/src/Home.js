import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Bill Generator</h1>
      <div className="space-y-4">
        <Link to="/add-category" className="block w-64 text-center bg-blue-500 text-white py-2 rounded">
          Add Category
        </Link>
        <Link to="/add-product" className="block w-64 text-center bg-blue-500 text-white py-2 rounded">
          Add Product
        </Link>
        <Link to="/show-menu" className="block w-64 text-center bg-blue-500 text-white py-2 rounded">
          Show Menu
        </Link>
        <Link to="/generate-bill" className="block w-64 text-center bg-blue-500 text-white py-2 rounded">
          Generate Bill
        </Link>
        
      </div>
    </div>
  );
}

export default Home;
