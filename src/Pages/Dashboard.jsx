import React from 'react';
import { Search, Bell, ShieldAlert, ArrowRight, Users, MapPin, AlertTriangle, Plus, Minus } from 'lucide-react';

const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-1/2">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" 
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md animate-pulse">
            🕐 12:30:45 PM
          </div>
          <button className="p-2 bg-white rounded-full border border-gray-200 relative hover:bg-gray-50 transition-all hover:scale-105">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>
          <button className={`bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105`}>
            <ShieldAlert size={16} />
            SOS
          </button>
          <div className="flex items-center gap-3 bg-white pl-3 pr-6 py-1.5 rounded-full border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">SG</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-800">Shreya Gupta</span>
              <span className="text-[10px] text-gray-500">Premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 mb-6 text-white flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="z-10 max-w-lg">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">Emergency</span>
          <h1 className="text-3xl font-bold mt-3 mb-2">Ready when you need it</h1>
          <p className="text-sm opacity-90 mb-6">Tap the SOS button to instantly alert your trusted contacts with your live location.</p>
          <button className="bg-white text-purple-600 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-gray-100 group transition-all hover:shadow-lg">
            Go to SOS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="hidden md:flex bg-white/10 backdrop-blur-md w-32 h-32 rounded-full border-2 border-white/40 items-center justify-center mr-8 animate-pulse">
          <div className="bg-white w-20 h-20 rounded-full flex flex-col items-center justify-center text-purple-600 shadow-lg">
            <ShieldAlert size={28} className="mb-0.5" />
            <span className="text-[10px] font-bold">SOS</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Center Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative hover:shadow-xl hover:border-purple-300 transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-50 p-2 rounded-full text-purple-600 hover:rotate-12 transition-transform">
                  <Bell size={18} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">+12%</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">128</h2>
              <p className="text-xs text-gray-500">Total Alerts</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative hover:shadow-xl hover:border-purple-300 transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-50 p-2 rounded-full text-purple-600 hover:rotate-12 transition-transform">
                  <Users size={18} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">+2</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">6</h2>
              <p className="text-xs text-gray-500">Trusted Contacts</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative hover:shadow-xl hover:border-purple-300 transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-50 p-2 rounded-full text-purple-600 hover:rotate-12 transition-transform">
                  <MapPin size={18} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">+8%</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">42</h2>
              <p className="text-xs text-gray-500">Location Shares</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative hover:shadow-xl hover:border-purple-300 transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-50 p-2 rounded-full text-purple-600 hover:rotate-12 transition-transform">
                  <ShieldAlert size={18} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">+3</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">98</h2>
              <p className="text-xs text-gray-500">Safety Score</p>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Recent Alerts</h3>
              <button className="text-purple-600 text-xs font-semibold hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-500 hover:rotate-12 transition-transform">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">SOS Alert sent</p>
                    <p className="text-[10px] text-gray-500">Andheri West, Mumbai • 2h ago</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">RESOLVED</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-500 hover:rotate-12 transition-transform">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Live location shared</p>
                    <p className="text-[10px] text-gray-500">Bandra Station • Yesterday</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">CLOSED</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-500 hover:rotate-12 transition-transform">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Test alert</p>
                    <p className="text-[10px] text-gray-500">Home • 5d ago</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700">TEST</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-full text-red-500 hover:rotate-12 transition-transform">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Trip check-in</p>
                    <p className="text-[10px] text-gray-500">Cab #4523 • 5d ago</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600">CLOSED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg hover:rotate-12 transition-transform">SG</div>
              <div>
                <h3 className="font-bold text-gray-800">Shreya Gupta</h3>
                <p className="text-xs text-gray-500">Protected - Level 3</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center hover:bg-purple-100 transition-colors">
                <p className="font-bold text-gray-800 text-lg">6</p>
                <p className="text-[10px] text-gray-500">TRUSTED</p>
              </div>
              <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center hover:bg-purple-100 transition-colors">
                <p className="font-bold text-gray-800 text-lg">12</p>
                <p className="text-[10px] text-gray-500">ALERTS</p>
              </div>
            </div>
            <button className="w-full py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">View Profile</button>
          </div>

          {/* Live Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800">Live location</h3>
              <MapPin size={16} className="text-purple-500 animate-pulse" />
            </div>
            <div className="w-full h-32 bg-blue-100 rounded-xl relative mb-3 overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 bg-cover bg-center opacity-80">
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Map View</div>
              </div>
              <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                <button className="bg-white p-1 rounded shadow hover:bg-gray-50 transition-colors"><Plus size={14} /></button>
                <button className="bg-white p-1 rounded shadow hover:bg-gray-50 transition-colors"><Minus size={14} /></button>
              </div>
              <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-0.5 rounded text-[10px] text-gray-600 backdrop-blur-sm">Amravati, India • Updated just now</div>
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-all hover:shadow-lg">Open Map</button>
          </div>

          {/* Safety Tip */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-xl transition-shadow">
            <div className="bg-purple-50 p-2 rounded-full text-purple-600 hover:rotate-12 transition-transform">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800">Safety Tip</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">Enable auto-check-ins for late-night commutes. SafeHer will ping your trusted contact if you miss a check-in.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;