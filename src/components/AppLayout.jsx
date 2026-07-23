import React from 'react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">{
        children
      }</main>
    </div>
  );
};

export default AppLayout;
