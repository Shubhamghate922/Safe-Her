import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, CheckCircle, XCircle, Shield, Clock, MapPin, 
  ChevronDown, ChevronUp, Users, Loader2, MapPin as MapPinIcon
} from 'lucide-react';
import { sosAPI } from '../services/api';
import toast from 'react-hot-toast';

const EmergencyHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await sosAPI.getHistory();
      if (response.success) {
        setHistory(response.data);
      }
    } catch (error) {
      toast.error('Failed to load emergency history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-red-100 text-red-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return <AlertTriangle size={14} className="text-red-600" />;
      case 'resolved': return <CheckCircle size={14} className="text-green-600" />;
      case 'cancelled': return <XCircle size={14} className="text-gray-500" />;
      default: return <Shield size={14} className="text-yellow-600" />;
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
              <AlertTriangle className="text-purple-600 hover:scale-110 transition-transform duration-300" size={24} />
              Emergency History
            </h1>
            <p className="text-sm text-gray-500 mt-1 hover:text-purple-500 transition-colors duration-300">
              Every alert, logged and searchable.
            </p>
          </div>
          <button
            onClick={fetchHistory}
            className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-all"
          >
            Refresh
          </button>
        </div>

        {/* History List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          {history.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <AlertTriangle size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-semibold">No emergency history</p>
              <p className="text-sm">Your SOS alerts will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((alert) => (
                <div key={alert._id} className="hover:bg-purple-50 transition-all duration-300">
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleExpand(alert._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-red-100 rounded-full">
                          {getStatusIcon(alert.status)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {alert.message || 'SOS Emergency Alert'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={12} />
                            <span>{new Date(alert.createdAt).toLocaleString()}</span>
                            <MapPin size={12} className="ml-2" />
                            <span>{alert.address || `${alert.latitude}, ${alert.longitude}`}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                        {expandedId === alert._id ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedId === alert._id && (
                    <div className="px-4 pb-4 bg-purple-50/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-xl border border-gray-100">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase">Location Details</h4>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Latitude:</span> {alert.latitude}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Longitude:</span> {alert.longitude}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Address:</span> {alert.address || 'Not available'}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase">Alert Details</h4>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Status:</span>{' '}
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(alert.status)}`}>
                                {alert.status}
                              </span>
                            </p>
                            {alert.resolvedAt && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Resolved:</span> {new Date(alert.resolvedAt).toLocaleString()}
                              </p>
                            )}
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Message:</span> {alert.message || 'SOS Emergency Alert'}
                            </p>
                            {alert.notifiedContacts && alert.notifiedContacts.length > 0 && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Contacts Notified:</span> {alert.notifiedContacts.length}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <StatCard
            label="Total Alerts"
            value={history.length}
            icon={AlertTriangle}
            color="purple"
          />
          <StatCard
            label="Active"
            value={history.filter(a => a.status === 'active').length}
            icon={AlertTriangle}
            color="red"
          />
          <StatCard
            label="Resolved"
            value={history.filter(a => a.status === 'resolved').length}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            label="Cancelled"
            value={history.filter(a => a.status === 'cancelled').length}
            icon={XCircle}
            color="gray"
          />
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, icon: Icon, color }) => {
  const colorClasses = {
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 hover:text-purple-500 transition-colors duration-300">{label}</p>
          <p className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-300">{value}</p>
        </div>
        <div className={`p-3 rounded-full hover:scale-110 transition-all duration-300 ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default EmergencyHistory;
