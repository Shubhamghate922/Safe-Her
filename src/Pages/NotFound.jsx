import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative inline-block">
          <AlertTriangle size={120} className="text-purple-600 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-black text-purple-600">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-6">Page Not Found</h1>
        <p className="text-gray-500 mt-2">Oops! The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default PageNotFound;