import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, ShieldAlert, Users, MapPin, AlertTriangle, 
  Plus, Database, Edit2, Trash2, Eye, RefreshCw, Zap, 
  CheckCircle, Filter, UserCheck, Shield, Clock, Loader2
} from 'lucide-react';
import { adminAPI, authAPI, sosAPI, notificationsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSOSAlerts: 0,
    activeSOSAlerts: 0,
    resolvedSOSAlerts: 0,
  });
  const [recentSOS, setRecentSOS] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch user profile
      const userResponse = await authAPI.getProfile();
      if (userResponse.success) {
        setUser(userResponse.data);
      }

      // Fetch admin statistics only if user is admin
      const isAdmin = userResponse?.data?.role === 'admin';
      if (isAdmin) {
        const statsResponse = await adminAPI.getStatistics();
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      }

      // Fetch recent SOS alerts
      const sosResponse = await sosAPI.getHistory();
      if (sosResponse.success) {
        setRecentSOS(sosResponse.data.slice(0, 5));
      }

      // Fetch notifications
      const notifResponse = await notificationsAPI.getAll();
      if (notifResponse.success) {
        setRecentNotifications(notifResponse.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleResolveSOS = async (id) => {
    try {
      const response = await adminAPI.resolveSOS(id);
      if (response.success) {
        toast.success('SOS alert resolved');
        fetchDashboardData();
      }
    } catch (error) {
      toast.error('Failed to resolve SOS alert');
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name || 'User'}!</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="p-2 bg-white rounded-full border border-gray-200 hover:shadow-md transition-all"
            >
              <RefreshCw size={18} className="text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers}
            color="purple"
          />
          <StatCard
            icon={Shield}
            label="Active Users"
            value={stats.activeUsers}
            color="green"
          />
          <StatCard
            icon={AlertTriangle}
            label="Total SOS Alerts"
            value={stats.totalSOSAlerts}
            color="red"
          />
          <StatCard
            icon={CheckCircle}
            label="Resolved Alerts"
            value={stats.resolvedSOSAlerts}
            color="blue"
          />
        </div>

        {/* Recent SOS Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" />
              Recent SOS Alerts
            </h2>
            <button
              onClick={() => navigate('/emergency-history')}
              className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentSOS.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No SOS alerts yet</p>
            ) : (
              recentSOS.map((alert) => (
                <SOSAlertItem 
                  key={alert._id} 
                  alert={alert} 
                  onResolve={handleResolveSOS}
                />
              ))
            )}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Bell size={20} className="text-purple-600" />
              Recent Notifications
            </h2>
            <button
              onClick={() => navigate('/notifications')}
              className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentNotifications.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No notifications yet</p>
            ) : (
              recentNotifications.map((notif) => (
                <NotificationItem key={notif._id} notification={notif} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

// SOS Alert Item Component
const SOSAlertItem = ({ alert, onResolve }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-100 text-red-700';
      case 'RESOLVED': return 'bg-green-100 text-green-700';
      case 'CANCELLED': return 'bg-gray-100 text-gray-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-full text-red-600">
          <AlertTriangle size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {alert.message || 'SOS Emergency Alert'}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(alert.status)}`}>
          {alert.status}
        </span>
        {alert.status === 'ACTIVE' && user?.role === 'admin' && (
          <button
            onClick={() => onResolve(alert._id)}
            className="text-xs px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
};

// Notification Item Component
const NotificationItem = ({ notification }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${notification.isRead ? 'bg-gray-50' : 'bg-purple-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${notification.isRead ? 'bg-gray-200' : 'bg-purple-200'}`}>
          <Bell size={16} className={notification.isRead ? 'text-gray-600' : 'text-purple-600'} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{notification.title}</p>
          <p className="text-xs text-gray-500">{notification.message}</p>
        </div>
      </div>
      <span className="text-xs text-gray-500">
        {new Date(notification.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default Dashboard;