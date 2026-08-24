import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, ShieldAlert, Users, MapPin, AlertTriangle, 
  Plus, Database, Edit2, Trash2, Eye, RefreshCw, Zap, 
  CheckCircle, Filter, UserCheck, Shield, Clock, Loader2,
  AlertCircle // Added for SOS button
} from 'lucide-react';
import { adminAPI, sosAPI, notificationsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch admin statistics only if user is admin
      const isAdmin = user?.role === 'admin';
      if (isAdmin) {
        const statsResponse = await adminAPI.getStatistics();
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }
      }

      // Fetch recent SOS alerts
      const sosResponse = await sosAPI.getHistory({ limit: 5 });
      if (sosResponse.success) {
        setRecentSOS(sosResponse.data.slice(0, 5));
      }

      // Fetch notifications
      const notifResponse = await notificationsAPI.getAll({ limit: 5 });
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
    await logout();
    navigate('/login');
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

  // Navigate to SOS page
  const handleSOSPress = () => {
    navigate('/sos');
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
            {/* SOS Button - Prominent and always visible */}
            <button
              onClick={handleSOSPress}
              className="px-6 py-2.5 bg-red-600 text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg shadow-red-500/30 hover:bg-red-700 hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <AlertCircle size={18} />
              SOS Emergency
            </button>
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
                  userRole={user?.role}
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

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colors = { purple: 'bg-purple-100 text-purple-600', green: 'bg-green-100 text-green-600', red: 'bg-red-100 text-red-600', blue: 'bg-blue-100 text-blue-600' };
  return <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"><div className="flex items-center justify-between mb-2"><div className={`p-3 rounded-full ${colors[color]}`}><Icon size={24} /></div><span className="text-2xl font-bold text-gray-800">{value}</span></div><p className="text-sm text-gray-600">{label}</p></div>;
};

const SOSAlertItem = ({ alert, onResolve, userRole }) => <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl"><div><p className="text-sm font-semibold text-gray-800">{alert.message || 'SOS Emergency Alert'}</p><p className="text-xs text-gray-500">{alert.createdAt ? new Date(alert.createdAt).toLocaleString() : 'Just now'}</p></div><div className="flex items-center gap-2"><span className="text-xs px-3 py-1 rounded-full font-semibold bg-red-100 text-red-700">{alert.status}</span>{alert.status === 'active' && userRole === 'admin' && <button onClick={() => onResolve(alert._id)} className="text-xs px-3 py-1 bg-green-600 text-white rounded-full">Resolve</button>}</div></div>;

const NotificationItem = ({ notification }) => <div className={`p-3 rounded-xl ${notification.isRead ? 'bg-gray-50' : 'bg-purple-50'}`}><p className="text-sm font-semibold text-gray-800">{notification.title}</p><p className="text-xs text-gray-500">{notification.message}</p></div>;

export default Dashboard;
