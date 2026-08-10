import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, User, Users, History, MapPin, Settings, LogOut, ShieldAlert, Bell
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/emergency-contacts", icon: Users, label: "Emergency Contacts" },
    { path: "/emergency-history", icon: History, label: "Emergency History" },
    { path: "/live-location", icon: MapPin, label: "Live Location" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full text-white">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Safe<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Her</span>
          </h2>
          <p className="text-xs text-gray-500">Your Safety Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
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
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;