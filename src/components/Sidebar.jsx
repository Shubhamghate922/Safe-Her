import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Users,
  History,
  MapPin,
  Settings,
  LogOut,
  ShieldAlert,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex flex-col">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="text-bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full text-white">
          <img src="\public\Safe-Her logo.png" alt="Safe-Her Logo" className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-md"/>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Safe<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Her</span>
          </h2>
          <p className="text-xs text-gray-500">
            Your Safety Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">

        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium ${
            location.pathname === "/dashboard"//With the help of chat GPT
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium ${
            location.pathname === "/profile"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <User size={18} />
          Profile
        </Link>

        <Link
          to="/emergency-contacts"
          className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium ${
            location.pathname === "/emergency-contacts"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Users size={18} />
          Emergency Contacts
        </Link>

        <Link
          to="/emergency-history"
          className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium ${
            location.pathname === "/emergency-history"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <History size={18} />
          Emergency History
        </Link>

        <Link
          to="/live-location"
          className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium ${
            location.pathname === "/live-location"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <MapPin size={18} />
          Live Location
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium ${
            location.pathname === "/settings"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>

      {/* Safety Tip */}
      <div className="p-4">
        <div className="bg-purple-50 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-purple-700 text-sm font-semibold mb-2">
            <ShieldAlert size={16} />
            Safety Tip
          </div>

          <p className="text-xs text-gray-600">
            Share your live trip with a trusted contact before entering any cab.
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Link
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;