import React, { useState } from 'react';
import { MapPin, Navigation, Crosshair, Copy, RefreshCw, Shield, Users, Clock, Wifi, Share2, Send, Phone, MessageSquare, Compass, Plus, Minus } from 'lucide-react';

const LiveLocation = () => {
  const [location] = useState({
    latitude: '19.0760° N',
    longitude: '72.8777° E',
    accuracy: '±8 meters',
    address: 'Amravati, Maharashtra, IN',
    updated: 'just now',
  });

  const [sharedWith] = useState([
    { id: 1, name: 'Ravi Doe', relation: 'Father' },
    { id: 2, name: 'Meera Doe', relation: 'Mother' },
    { id: 3, name: 'Priya Singh', relation: 'Best Friend' },
  ]);

  const [locationHistory] = useState([
    { time: '10:30 AM', location: 'Andheri West, Mumbai', accuracy: '±8m' },
    { time: '10:15 AM', location: 'Andheri East, Mumbai', accuracy: '±12m' },
    { time: '10:00 AM', location: 'Bandra, Mumbai', accuracy: '±15m' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
              <MapPin className="text-purple-600 hover:scale-110 transition-transform duration-300" size={24} />
              Live Location
            </h1>
            <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">
              Real-time GPS tracking with adjustable sharing radius.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:scale-105 transition-all duration-300">
            <Share2 size={16} />
            Start Sharing
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Location Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Location Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-50 p-3 rounded-full hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                  <Navigation className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">Current Location</h3>
                  <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">Live tracking active</p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 hover:scale-105 transition-all duration-300">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <LocationInfoRow icon={Crosshair} label="Latitude" value={location.latitude} />
                <LocationInfoRow icon={Crosshair} label="Longitude" value={location.longitude} />
                <LocationInfoRow icon={Crosshair} label="Accuracy" value={location.accuracy} />
                <LocationInfoRow icon={MapPin} label="Address" value={location.address} />
                <LocationInfoRow icon={Clock} label="Updated" value={location.updated} valueColor="text-green-600" />
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <Copy size={14} />
                  Copy Location
                </button>
                <button className="flex-1 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <RefreshCw size={14} />
                  Refresh
                </button>
              </div>
            </div>

            

            {/* Sharing With */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
                  <Users size={16} className="text-purple-600" />
                  Sharing With
                </h3>
                <button className="text-purple-600 text-xs font-semibold hover:underline hover:scale-105 transition-all duration-300">
                  Manage
                </button>
              </div>
              <div className="space-y-2">
                {sharedWith.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl hover:bg-purple-50 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform duration-300">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">{contact.name}</p>
                        <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">{contact.relation}</p>
                      </div>
                    </div>
                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 hover:scale-105 transition-all duration-300">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map and History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                {/* Map */}
                <div className="w-full h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 relative hover:scale-[1.01] transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="text-purple-600 mx-auto mb-2 hover:scale-110 transition-transform duration-300" />
                      <p className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-300">Mumbai, India</p>
                      <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">Live location tracking</p>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-1">
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-purple-50 hover:scale-110 transition-all duration-300">
                      <Plus size={16} className="text-gray-600" />
                    </button>
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-purple-50 hover:scale-110 transition-all duration-300">
                      <Minus size={16} className="text-gray-600" />
                    </button>
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-purple-50 hover:scale-110 transition-all duration-300">
                      <Compass size={16} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-all duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Live Sharing Active
                  </div>
                </div>

                {/* Map Legend */}
                <div className="p-3 border-t border-gray-100 bg-gray-50 hover:bg-purple-50 transition-colors duration-300">

                </div>
              </div>
            </div>

            {/* Location History */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
                  <Clock size={16} className="text-purple-600" />
                  Location History
                </h3>
                <button className="text-purple-600 text-xs font-semibold hover:underline hover:scale-105 transition-all duration-300">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {locationHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl hover:bg-purple-50 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                        <MapPin size={14} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">{entry.location}</p>
                        <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">{entry.time}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">±{entry.accuracy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <QuickActionCard icon={Phone} label="Call Contact" color="purple" />
              <QuickActionCard icon={MessageSquare} label="Send SMS" color="blue" />
              <QuickActionCard icon={Send} label="Share via" color="green" />
            </div>
          </div>
        </div>

        {/* Safety Tip */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 hover:scale-110 hover:rotate-6 transition-all duration-300">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">Safety Tip</h4>
              <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5 hover:text-purple-700 transition-colors duration-300">
                Share your live trip with a trusted contact before entering any cab. 
                Your contacts will receive real-time location updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationInfoRow = ({ icon: Icon, label, value, valueColor = 'text-gray-800' }) => (
  <div className="flex items-start gap-3 hover:scale-[1.02] transition-all duration-300">
    <Icon size={14} className="text-gray-400 mt-0.5 hover:text-purple-600 transition-colors duration-300" />
    <div className="flex-1">
      <p className="text-[10px] text-gray-500 font-medium hover:text-purple-500 transition-colors duration-300">{label}</p>
      <p className={`text-sm font-semibold ${valueColor} hover:text-purple-600 transition-colors duration-300`}>{value}</p>
    </div>
  </div>
);

const QuickActionCard = ({ icon: Icon, label, color }) => {
  const colorClasses = {
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
    blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
    green: 'bg-green-50 hover:bg-green-100 text-green-600',
  };

  return (
    <button className={`p-3 rounded-2xl transition-all duration-300 text-center ${colorClasses[color]} hover:scale-105 hover:-translate-y-1`}>
      <Icon size={20} className="mx-auto mb-1" />
      <span className="text-[10px] font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-300">{label}</span>
    </button>
  );
};

export default LiveLocation;