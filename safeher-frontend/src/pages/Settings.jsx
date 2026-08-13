import React, { useState } from 'react';
import { 
  Settings, Moon, Bell, Globe, Lock, Key, User, Shield, Trash2, ChevronRight, 
  LogOut, Loader2, Eye, EyeOff, CheckCircle, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.success) {
        toast.success('Password changed successfully');
        setShowChangePassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
              <Settings className="text-purple-600 hover:rotate-90 transition-transform duration-300" size={24} />
              Settings
            </h1>
            <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">
              Customize your SafeHer experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    {user?.name || 'User'}
                  </h3>
                  <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                    {user?.role === 'admin' ? 'Admin' : 'Premium Member'}
                  </p>
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block hover:scale-105 hover:bg-green-200 transition-all duration-300">
                    Verified
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-gray-50 hover:bg-purple-50 transition-colors duration-300 px-2 rounded-lg">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    {user?.email}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50 hover:bg-purple-50 transition-colors duration-300 px-2 rounded-lg">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    {user?.phone}
                  </span>
                </div>
                <div className="flex justify-between py-1 hover:bg-purple-50 transition-colors duration-300 px-2 rounded-lg">
                  <span className="text-gray-500">Member Since</span>
                  <span className="text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 hover:rotate-12 transition-all duration-300">
                  <Shield size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    Safety Tip
                  </h4>
                  <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5 hover:text-purple-700 transition-colors duration-300">
                    Share your live trip with a trusted contact before entering any cab.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2 border border-red-100 hover:scale-105 hover:shadow-lg hover:border-red-300"
            >
              <LogOut size={18} className="hover:animate-pulse" />
              Logout
            </button>
          </div>

          {/* Right Column - Settings Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Dark Mode */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:scale-110">
                    <Moon size={20} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Dark Mode
                    </h3>
                    <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Easier on the eyes at night.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      darkMode ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 hover:scale-110 ${
                      darkMode ? 'left-6' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:scale-110">
                    <Key size={20} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Change Password
                    </h3>
                    <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Update your account password.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold hover:bg-purple-100 hover:scale-105 transition-all duration-300"
                  >
                    {showChangePassword ? 'Cancel' : 'Change'}
                  </button>
                </div>
              </div>

              {/* Change Password Form */}
              {showChangePassword && (
                <form onSubmit={handleUpdatePassword} className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    {passwordLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Delete Account */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100 hover:border-red-300 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300 hover:scale-110">
                    <Trash2 size={20} className="text-red-600 hover:text-red-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-red-600 hover:text-red-700 transition-colors duration-300">
                      Delete Account
                    </h3>
                    <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Permanently delete your SafeHer account.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        // Implement account deletion
                        toast.error('Account deletion requires contacting support');
                      }
                    }}
                    className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-semibold hover:bg-red-100 hover:scale-105 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
