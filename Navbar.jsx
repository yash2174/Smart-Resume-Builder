// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-yellow-400 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Smart Resume Builder</h1>
      <button className="bg-white text-yellow-500 px-4 py-2 rounded hover:bg-yellow-100 transition">
        Export PDF
      </button>
    </nav>
  );
};

export default Navbar;
