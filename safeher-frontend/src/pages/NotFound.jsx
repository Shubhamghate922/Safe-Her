import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-6">
          <AlertTriangle size={120} className="text-purple-600 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-black text-purple-600">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;