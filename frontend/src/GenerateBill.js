import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom'; // Import Link for routing

function GenerateBill() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [bill, setBill] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [quantity, setQuantity] = useState({});  // Track quantity per product

  useEffect(() => {
    const fetchCategories = async () => {
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
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/products/${selectedCategory}`);
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            console.error('Failed to fetch products');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchProducts();
    }
  }, [selectedCategory]);

  const addToBill = (product) => {
    const productQuantity = quantity[product._id] || 0; // Get quantity or default to 0

    if (productQuantity > 0) {
      const existingProduct = bill.find(item => item._id === product._id);
      if (existingProduct) {
        setBill(bill.map(item => item._id === product._id ? { ...item, quantity: item.quantity + productQuantity } : item));
      } else {
        setBill([...bill, { ...product, quantity: productQuantity }]);
      }
      setQuantity({ ...quantity, [product._id]: 0 }); // Reset quantity input after adding
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
    setNewQuantity(item.quantity);
  };

  const saveEditedItem = () => {
    if (newQuantity > 0) {
      setBill(bill.map(item => 
        item._id === editingItem._id ? { ...item, quantity: newQuantity } : item
      ));
      setEditingItem(null);
      setNewQuantity(0);
    }
  };

  const calculateTotal = () => {
    return bill.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add Title and Header
    doc.setFontSize(18);
    doc.text('Restaurant Bill', 105, 20, null, null, 'center');  // Title centered at top
    doc.setFontSize(12);
    doc.text('--------------------------------------------------------', 10, 30);

    // Add Bill Details
    let y = 40;
    bill.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} (${item.quantity} x $${item.price})`, 10, y);
      doc.text(`= $${item.quantity * item.price}`, 150, y);
      y += 10;
    });

    // Add total
    const total = calculateTotal();
    doc.text('--------------------------------------------------------', 10, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${total.toFixed(2)}`, 10, y);
    y += 10;

    // Save PDF
    doc.save('bill.pdf');
  };

  return (
    <div className="p-4">
      <Link to="/" className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out mb-8 inline-block">
        Back to Home
      </Link>

      <label className="block mb-2">Select Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <ul>
        {products.map((product) => (
          <li key={product._id} className="mb-2 flex items-center">
            {product.name} - ${product.price}
            <input
              type="number"
              placeholder="Quantity"
              value={quantity[product._id] || ''}
              onChange={(e) => setQuantity({ ...quantity, [product._id]: e.target.value })}
              className="border p-2 ml-2"
            />
            <button
              onClick={() => addToBill(product)}
              className="bg-green-500 text-white p-2 ml-2"
            >
              Add to Bill
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl mt-4">Current Bill</h2>
      <div className="border p-4 bg-white shadow-md">
        <ul>
          {bill.map((item, index) => (
            <li key={item._id} className="mb-2 flex justify-between">
              <span>{index + 1}. {item.name} - {item.quantity} x ${item.price}</span>
              <span>${item.quantity * item.price}</span>
              <button 
                onClick={() => editItem(item)}
                className="bg-yellow-500 text-white p-2 ml-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-4 flex justify-between">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {editingItem && (
        <div className="mt-4">
          <h3>Edit Item: {editingItem.name}</h3>
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={saveEditedItem}
            className="bg-blue-500 text-white p-2 ml-2"
          >
            Save
          </button>
        </div>
      )}

      <button onClick={generatePDF} className="bg-blue-500 text-white p-2 mt-4">Generate Bill</button>
    </div>
  );
}

export default GenerateBill;
