import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Heart, Users, Clock, Shield, Edit2, CheckCircle, AlertCircle, LogOut, ChevronRight, Droplet, Activity, Award, Share2, Info, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { contactsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactsAPI.getAll();
      if (response.success) {
        setContacts(response.data);
      }
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-purple-600" />
      </div>
    );
  }

  // Get initials from name
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="text-sm text-gray-500">Manage your account and safety settings</p>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg transform">
            <Edit2 size={16} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform">
              {/* Profile Photo */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative group">
                  <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-2 border-white">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-4 hover:text-purple-600 transition-colors duration-300">{user.name}</h2>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full font-semibold hover:bg-purple-200 transition-all duration-300 hover:scale-105">
                    {user.role === 'admin' ? 'Admin' : 'Premium Member'}
                  </span>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1.5 rounded-full font-semibold hover:bg-green-200 transition-all duration-300 hover:scale-105">
                    Verified ✓
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
                  <p className="text-xl font-bold text-white">{contacts.length}</p>
                  <p className="text-[10px] text-white/90">CONTACTS</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
                  <p className="text-xl font-bold text-white">98</p>
                  <p className="text-[10px] text-white/90">SAFETY</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
                  <p className="text-xl font-bold text-white">{user.safetyScore || 50}</p>
                  <p className="text-[10px] text-white/90">SCORE</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transform">
                  <Share2 size={16} />
                  Share Live Location
                </button>
                <button className="w-full py-3 border-2 border-purple-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:border-purple-400 transform">
                  <Users size={16} />
                  Manage Emergency Contacts
                </button>
              </div>
            </div>

            {/* Safety Tip Card */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 mt-4 border-2 border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-lg transform cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="bg-purple-600 p-2.5 rounded-full hover:bg-purple-700 hover:rotate-12 transition-all duration-300">
                  <Shield size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">Safety Tip</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1 hover:text-purple-700 transition-colors duration-300">Share your live trip with a trusted contact before entering any cab.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
                  <User size={20} className="text-purple-600" />
                  Personal Information
                </h3>
                <button className="text-purple-600 text-sm font-semibold hover:underline hover:text-purple-800 transition-all duration-300 hover:scale-105">Edit</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoRow icon={User} label="Full Name" value={user.name} />
                <InfoRow icon={Mail} label="Email" value={user.email} verified />
                <InfoRow icon={Phone} label="Phone" value={user.phone} verified />
                <InfoRow icon={MapPin} label="Address" value={user.profile?.address?.city || 'Not set'} />
                <InfoRow icon={Droplet} label="Blood Group" value={user.profile?.bloodGroup || 'Not set'} />
                <InfoRow icon={Activity} label="Medical Notes" value={user.profile?.medicalNotes || 'No medical notes'} />
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
                  <Users size={20} className="text-purple-600" />
                  Emergency Contacts
                </h3>
                <button className="text-purple-600 text-sm font-semibold hover:underline flex items-center gap-1 hover:text-purple-800 transition-all duration-300">View All <ChevronRight size={14} /></button>
              </div>
              <div className="space-y-3">
                {contacts.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-4">No emergency contacts added yet</p>
                ) : (
                  contacts.slice(0, 3).map((contact) => (
                    <EmergencyContact 
                      key={contact._id}
                      name={contact.name} 
                      relation={contact.relationship} 
                      phone={contact.phone} 
                      status={contact.isActive ? 'Active' : 'Inactive'}
                      isPrimary={contact.isPrimary}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
                  <Clock size={20} className="text-purple-600" />
                  Recent Activity
                </h3>
                <button className="text-purple-600 text-sm font-semibold hover:underline hover:text-purple-800 transition-all duration-300">View All</button>
              </div>
              <div className="space-y-3">
                <ActivityItem icon={Shield} title="SOS Alert sent" time="2 hours ago" status="Resolved" statusColor="text-green-600" />
                <ActivityItem icon={MapPin} title="Live location shared" time="Yesterday" status="Shared" statusColor="text-purple-600" />
                <ActivityItem icon={Users} title="Emergency contact added" time="3 days ago" status="Added" statusColor="text-blue-600" />
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={logout}
              className="w-full py-3.5 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-red-200 hover:border-red-400 hover:scale-105 hover:shadow-lg transform"
            >
              <LogOut size={18} className="hover:animate-pulse" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({ icon: Icon, label, value, verified }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-md transform cursor-pointer">
    <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600 hover:bg-purple-200 transition-all duration-300 hover:rotate-6">
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-gray-500 font-medium hover:text-purple-500 transition-colors duration-300">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-800 font-medium truncate hover:text-purple-600 transition-colors duration-300">{value}</p>
        {verified && <CheckCircle size={14} className="text-green-500 flex-shrink-0 hover:animate-bounce" />}
      </div>
    </div>
  </div>
);

const EmergencyContact = ({ name, relation, phone, status, isPrimary }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-md transform cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="bg-purple-100 p-2.5 rounded-full text-purple-600 hover:bg-purple-200 transition-all duration-300 hover:rotate-12">
        <User size={16} />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">
          {name} {isPrimary && <span className="text-xs text-yellow-500">★</span>}
        </p>
        <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">{relation} • {phone}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[10px] px-3 py-1.5 rounded-full font-medium transition-all duration-300 hover:scale-110 ${
        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}>
        {status}
      </span>
      <button className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-150">
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

const ActivityItem = ({ icon: Icon, title, time, status, statusColor }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-md transform cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="bg-purple-100 p-2.5 rounded-full text-purple-600 hover:bg-purple-200 transition-all duration-300 hover:rotate-12">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">{title}</p>
        <p className="text-[10px] text-gray-500 hover:text-purple-500 transition-colors duration-300">{time}</p>
      </div>
    </div>
    <span className={`text-[10px] font-semibold ${statusColor} hover:animate-pulse`}>
      {status}
    </span>
  </div>
);

export default Profile;
