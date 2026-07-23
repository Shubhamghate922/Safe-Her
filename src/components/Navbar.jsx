import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl bg-white/70 backdrop-blur-lg shadow-sm rounded-full px-8 py-4 flex justify-between items-center z-50 border border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
          <img src="\public\Safe-Her logo.png" alt="Safe-Her Logo" className="w-25 h-25 object-contain" />
        </div>

        <span className="text-2xl font-bold text-gray-800">Safe<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Her</span>
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-4 text-sm font-medium">
        <a href="#" className="px-5 py-2 rounded-full transition-all duration-300 text-gray-700 hover:bg-purple-100 hover:text-purple-700">
          Home
        </a>

        <a href="#features" className="px-5 py-2 rounded-full transition-all duration-300 text-gray-700 hover:bg-purple-100 hover:text-purple-700">
          Features
        </a>

        <a href="#how-it-works" className="px-5 py-2 rounded-full transition-all duration-300 text-gray-700 hover:bg-purple-100 hover:text-purple-700">
          How It Works
        </a>

        <a href="#why-safeher" className="px-5 py-2 rounded-full transition-all duration-300 text-gray-700 hover:bg-purple-100 hover:text-purple-700">
          About
        </a>

        <a href="#contact" className="px-5 py-2 rounded-full transition-all duration-300 text-gray-700 hover:bg-purple-100 hover:text-purple-700">
          Contact
        </a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6">
        <Link to="/login" className="px-5 py-2 rounded-full text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-purple-100 hover:text-purple-700">
          Login
        </Link>

        <Link to="/register" className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-purple-500/30 transition-transform duration-150 hover:scale-105 active:scale-95">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;