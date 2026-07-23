import React from 'react';
import { Settings, Moon, Bell, Globe, Lock, User, Shield, Trash2, ChevronRight, Mail, MessageSquare, Phone, Wifi, Bluetooth, Camera, Mic, Database, Cloud, Smartphone, Key, AlertTriangle, CheckCircle, XCircle, ToggleLeft, ToggleRight, ShieldAlert, UserCheck, Fingerprint, Eye, EyeOff, HelpCircle, Info, LogOut } from 'lucide-react';

const SettingsPage = () => {
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
                  SG
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    Shreya Gupta
                  </h3>
                  <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                    Premium Member
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
                    shreyagupta@gmail.com
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50 hover:bg-purple-50 transition-colors duration-300 px-2 rounded-lg">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    +91 9699 XXX XXX
                  </span>
                </div>
                <div className="flex justify-between py-1 hover:bg-purple-50 transition-colors duration-300 px-2 rounded-lg">
                  <span className="text-gray-500">Member Since</span>
                  <span className="text-gray-800 hover:text-purple-600 transition-colors duration-300">
                    2024
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

            <button className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2 border border-red-100 hover:scale-105 hover:shadow-lg hover:border-red-300">
              <LogOut size={18} className="hover:animate-pulse" />
              Logout
            </button>
          </div>

          {/* Right Column - Settings Cards */}
          <div className="lg:col-span-2 space-y-4">
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
                    type="button"
                    className="relative w-12 h-6 bg-gray-300 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 hover:scale-110" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:scale-110">
                    <Bell size={20} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Notification Preferences
                    </h3>
                    <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Push, SMS, and email alerts.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-all duration-300">
                      Push
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 transition-all duration-300">
                      SMS
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-gray-200 text-gray-500 hover:bg-gray-300 hover:scale-105 transition-all duration-300">
                      Email
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:scale-110">
                    <Globe size={20} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Language
                    </h3>
                    <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Currently: English (US)
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <select className="px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 transition-colors duration-300">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>

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
                  <button className="px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold hover:bg-purple-100 hover:scale-105 transition-all duration-300">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300 hover:scale-110">
                    <Shield size={20} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Privacy Settings
                    </h3>
                    <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Control what SafeHer stores and shares.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                    Manage
                  </button>
                </div>
              </div>
            </div>

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
                  <button className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-semibold hover:bg-red-100 hover:scale-105 transition-all duration-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:bg-purple-50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                    <Fingerprint size={16} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Biometric Login
                    </h4>
                    <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Use fingerprint or face ID
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 hover:text-purple-600 hover:scale-125 transition-all duration-300" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:bg-purple-50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                    <Database size={16} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Data Usage
                    </h4>
                    <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Manage data storage
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 hover:text-purple-600 hover:scale-125 transition-all duration-300" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:bg-purple-50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                    <Cloud size={16} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Backup & Sync
                    </h4>
                    <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Sync across devices
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 hover:text-purple-600 hover:scale-125 transition-all duration-300" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:bg-purple-50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                    <HelpCircle size={16} className="text-purple-600 hover:text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                      Help & Support
                    </h4>
                    <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">
                      Get help from support
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 hover:text-purple-600 hover:scale-125 transition-all duration-300" />
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-4 hover:text-purple-500 transition-colors duration-300">
              SafeHer v2.4.0 • Terms of Service • Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;