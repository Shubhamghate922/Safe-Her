import React from 'react';
import { Shield } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl bg-white/70 backdrop-blur-lg shadow-sm rounded-full px-8 py-4 flex justify-between items-center z-50 border border-white/20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-1.5 rounded-full text-white">
          <Shield size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800">Safe<span className="text-purple-600">Her</span></span>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-purple-600 transition">Home</a>
        <a href="#features" className="hover:text-purple-600 transition">Features</a>
        <a href="#how-it-works" className="hover:text-purple-600 transition">How It Works</a>
        <a href="#why-safeher" className="hover:text-purple-600 transition">About</a>
        <a href="#contact" className="hover:text-purple-600 transition">Contact</a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-gray-700 hover:text-purple-600">Login</a>
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition shadow-md shadow-purple-500/30">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;