import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCategory from './Addcategory';
import AddProduct from './AddProduct';
import ShowMenu from './ShowMenu';
import GenerateBill from './GenerateBill';
import Home from './Home';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/show-menu" element={<ShowMenu />} />
        <Route path="/generate-bill" element={<GenerateBill />} />

       


      </Routes>
    </div>
  </Router>
  );
}

export default App;
