import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function ShowMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setMenu(data);
        } else {
          console.error('Failed to fetch menu');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMenu();
  }, []);

  // Group menu items by category
  const groupedMenu = menu.reduce((acc, item) => {
    const category = item.category || "Others"; // Default to "Others" if category is missing
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Restaurant Menu</h2>
          <p className="text-lg text-gray-600">Delicious meals crafted with care</p>
        </div>

        {/* Home Button */}
        <Link to="/" className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out mb-8 inline-block">
          Back to Home
        </Link>

        {/* Menu Container */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-8">
          {Object.keys(groupedMenu).map((category) => (
            <div key={category}>
              {/* Category Header */}
              <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">{category}</h3>

              {/* Menu Items List */}
              <ul>
                {groupedMenu[category].map((item) => (
                  <li key={item._id} className="flex justify-between items-center mb-6 py-4 px-6 border-b border-gray-100 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700">{item.name}</h4>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-700">${item.price.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowMenu;
