import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Crosshair, Copy, RefreshCw, Shield, Users, Clock, Wifi, Share2, Send, Phone, MessageSquare, Compass, Plus, Minus, Loader2 } from 'lucide-react';
import { locationAPI, contactsAPI } from '../services/api';
import toast from 'react-hot-toast';

const LiveLocation = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [sharedWith, setSharedWith] = useState([]);
  const [locationHistory, setLocationHistory] = useState([]);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    fetchLocationData();
    // Get user's current position if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          saveLocation(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.log('Geolocation error:', err);
        }
      );
    }
  }, []);

  const fetchLocationData = async () => {
    setLoading(true);
    try {
      // Get latest location
      const latestRes = await locationAPI.getLatest();
      if (latestRes.success && latestRes.data) {
        setLocation(latestRes.data);
      }

      // Get location history
      const historyRes = await locationAPI.getHistory({ limit: 5 });
      if (historyRes.success) {
        setLocationHistory(historyRes.data);
      }

      // Get contacts for sharing
      const contactsRes = await contactsAPI.getAll();
      if (contactsRes.success) {
        setSharedWith(contactsRes.data.slice(0, 3));
      }
    } catch (error) {
      toast.error('Failed to load location data');
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = async (lat, lng) => {
    try {
      const response = await locationAPI.save({
        latitude: lat,
        longitude: lng,
        source: 'gps',
        address: 'Current Location'
      });
      if (response.success) {
        setLocation(response.data);
      }
    } catch (error) {
      console.log('Error saving location:', error);
    }
  };

  const handleShareLocation = async () => {
    if (!location) {
      toast.error('No location available to share');
      return;
    }

    const contactIds = sharedWith.map(c => c._id);
    if (contactIds.length === 0) {
      toast.error('No contacts to share with');
      return;
    }

    try {
      const response = await locationAPI.share({
        contactIds,
        duration: 60 // Share for 60 minutes
      });
      if (response.success) {
        setIsSharing(true);
        toast.success(`Location shared with ${response.data.sharedWith.length} contacts`);
      }
    } catch (error) {
      toast.error('Failed to share location');
    }
  };

  const handleRefresh = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          saveLocation(pos.coords.latitude, pos.coords.longitude);
          toast.success('Location updated');
        },
        (err) => {
          toast.error('Unable to get current location');
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-purple-600" />
      </div>
    );
  }

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
          <button 
            onClick={handleShareLocation}
            className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:scale-105 transition-all duration-300"
            disabled={!location}
          >
            <Share2 size={16} />
            {isSharing ? 'Sharing Active' : 'Start Sharing'}
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
                  <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                    {isSharing ? 'Live sharing active' : 'Live tracking active'}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${isSharing ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {isSharing ? 'LIVE' : 'ACTIVE'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <LocationInfoRow 
                  icon={Crosshair} 
                  label="Latitude" 
                  value={location?.latitude?.toFixed(6) || 'Not available'} 
                />
                <LocationInfoRow 
                  icon={Crosshair} 
                  label="Longitude" 
                  value={location?.longitude?.toFixed(6) || 'Not available'} 
                />
                <LocationInfoRow 
                  icon={Crosshair} 
                  label="Accuracy" 
                  value={location?.accuracy ? `±${location.accuracy}m` : 'Not available'} 
                />
                <LocationInfoRow 
                  icon={MapPin} 
                  label="Address" 
                  value={location?.address || 'Not available'} 
                />
                <LocationInfoRow 
                  icon={Clock} 
                  label="Updated" 
                  value={location?.createdAt ? new Date(location.createdAt).toLocaleString() : 'Not available'}
                  valueColor="text-green-600"
                />
              </div>

              <div className="flex gap-2 mt-4">
                <button 
                  onClick={handleRefresh}
                  className="flex-1 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
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
                {sharedWith.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-2">No contacts to share with</p>
                ) : (
                  sharedWith.map((contact) => (
                    <div key={contact._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl hover:bg-purple-50 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform duration-300">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">{contact.name}</p>
                          <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">{contact.relationship}</p>
                        </div>
                      </div>
                      <span className={`text-[8px] px-2 py-0.5 rounded-full ${isSharing ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {isSharing ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ))
                )}
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
                      <p className="text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors duration-300">
                        {location?.address || 'Current Location'}
                      </p>
                      <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">
                        {location ? `${location.latitude?.toFixed(4)}, ${location.longitude?.toFixed(4)}` : 'Live location tracking'}
                      </p>
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
                  <div className={`absolute bottom-4 left-4 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition-all duration-300 ${isSharing ? 'bg-green-500' : 'bg-purple-600'}`}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {isSharing ? 'Live Sharing Active' : 'Location Active'}
                  </div>
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
                {locationHistory.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-4">No location history</p>
                ) : (
                  locationHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl hover:bg-purple-50 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center hover:bg-purple-100 hover:scale-110 transition-all duration-300">
                          <MapPin size={14} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">
                            {entry.address || `${entry.latitude?.toFixed(4)}, ${entry.longitude?.toFixed(4)}`}
                          </p>
                          <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">
                            {new Date(entry.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">
                        ±{entry.accuracy || 'N/A'}m
                      </span>
                    </div>
                  ))
                )}
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