import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Bell,
  ShieldAlert,
  Users,
  MapPin,
  AlertTriangle,
  Plus,
  Minus,
  Database,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Zap,
  CheckCircle,
  Filter,
  UserCheck,
  Shield,
  Clock,
} from 'lucide-react';
import {
  getUsers,
  getUserStats,
  getHealthStatus,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from '../services/api';
import UserModal from '../components/UserModal';
import UserDetailModal from '../components/UserDetailModal';
import TopicLab from '../components/TopicLab';

const Dashboard = () => {
  // State
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    suspendedUsers: 0,
    avgSafetyScore: 95,
    totalAlerts: 0,
  });
  const [health, setHealth] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  // Query state for req.query
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [inspectingUser, setInspectingUser] = useState(null);
  const [showTopicLab, setShowTopicLab] = useState(true);

  // Notification toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Dashboard Data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes, healthRes] = await Promise.all([
        getUsers({ search: searchTerm, status: statusFilter, role: roleFilter }),
        getUserStats(),
        getHealthStatus(),
      ]);

      if (usersRes.success) setUsers(usersRes.data);
      if (statsRes.success) {
        setStats(statsRes.stats);
        if (statsRes.recentActivity) setRecentActivity(statsRes.recentActivity);
      }
      if (healthRes.success) setHealth(healthRes);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showToast(`Failed to connect to backend server: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, roleFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // CRUD Handlers

  // POST (Create) & PUT (Update)
  const handleFormSubmit = async (payload) => {
    try {
      if (editingUser) {
        // PUT update
        const res = await updateUser(editingUser._id || editingUser.id, payload);
        if (res.success) {
          showToast(`User '${res.data.name}' updated via PUT method!`);
        }
      } else {
        // POST create
        const res = await createUser(payload);
        if (res.success) {
          showToast(`User '${res.data.name}' created in MongoDB via POST method!`);
        }
      }
      setIsModalOpen(false);
      setEditingUser(null);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    }
  };

  // PATCH (Partial Update e.g. status toggle)
  const handleToggleStatus = async (user, e) => {
    e.stopPropagation();
    const nextStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    try {
      const res = await patchUser(user._id || user.id, { status: nextStatus });
      if (res.success) {
        showToast(`User status patched to '${nextStatus}' via PATCH method!`);
        fetchData();
      }
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    }
  };

  // DELETE (Delete user document)
  const handleDeleteUser = async (user, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete user '${user.name}' from MongoDB?`)) return;

    try {
      const res = await deleteUser(user._id || user.id);
      if (res.success) {
        showToast(`User document '${user.name}' deleted via DELETE method!`);
        fetchData();
      }
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user, e) => {
    e.stopPropagation();
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const openInspectModal = (user) => {
    setInspectingUser(user);
    setIsDetailOpen(true);
  };

  return (
    <>
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold text-white transition-all transform animate-bounce flex items-center gap-2 ${
            toastMessage.type === 'error' ? 'bg-red-600' : 'bg-slate-900'
          }`}
        >
          <Zap size={16} className="text-amber-400" />
          {toastMessage.msg}
        </div>
      )}

      {/* Top Bar / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Search Bar (req.query.search) */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search MongoDB users by name, email, city (req.query)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* MongoDB Connection Status Pill */}
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
            <Database size={15} className="text-emerald-600 animate-pulse" />
            <span>
              {health?.database?.connected
                ? `MongoDB: ${health.database.isInMemory ? 'Memory Server' : 'mongodb://localhost:27017/user_dashboard'}`
                : 'Connecting MongoDB...'}
            </span>
          </div>

          {/* Toggle Lab Button */}
          <button
            onClick={() => setShowTopicLab(!showTopicLab)}
            className="p-2.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-full border border-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Zap size={16} />
            {showTopicLab ? 'Hide Lab' : 'Topic Lab'}
          </button>

          {/* Add User POST Button */}
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={16} />
            Create User (POST)
          </button>
        </div>
      </div>

      {/* Interactive Topic Lab */}
      {showTopicLab && <TopicLab />}

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-3xl p-8 mb-6 text-white flex justify-between items-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="z-10 max-w-xl">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            Full-Stack User Dashboard
          </span>
          <h1 className="text-3xl font-extrabold mt-3 mb-2">Node.js, Express.js & MongoDB Engine</h1>
          <p className="text-xs opacity-90 leading-relaxed mb-6">
            Live database connection targeting <code className="bg-black/20 px-2 py-0.5 rounded font-mono">mongodb://localhost:27017/user_dashboard</code>. Complete CRUD REST API supporting GET, POST, PUT, PATCH, and DELETE operations.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchData}
              className="bg-white text-purple-700 px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-gray-100 transition-all shadow-md"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Live MongoDB Data
            </button>
            <span className="text-[11px] opacity-80 font-mono">
              Server: Node {health?.server ? 'v24' : ''} • Express.js • BSON Documents
            </span>
          </div>
        </div>

        <div className="hidden md:flex bg-white/10 backdrop-blur-md w-32 h-32 rounded-full border-2 border-white/40 items-center justify-center mr-8">
          <div className="bg-white w-20 h-20 rounded-full flex flex-col items-center justify-center text-purple-600 shadow-lg">
            <Database size={26} className="mb-0.5" />
            <span className="text-[9px] font-extrabold uppercase">BSON CRUD</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Center Column (Users Management & Stats) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-50 p-2.5 rounded-full text-purple-600">
                  <Users size={18} />
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                  MongoDB
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-800">{stats.totalUsers}</h2>
              <p className="text-xs text-gray-500 font-medium">Total User Documents</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-green-50 p-2.5 rounded-full text-green-600">
                  <UserCheck size={18} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                  Active
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-800">{stats.activeUsers}</h2>
              <p className="text-xs text-gray-500 font-medium">Active Users</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-amber-50 p-2.5 rounded-full text-amber-600">
                  <Bell size={18} />
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                  Alerts
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-800">{stats.totalAlerts}</h2>
              <p className="text-xs text-gray-500 font-medium">Total Safety Alerts</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="bg-purple-50 p-2.5 rounded-full text-purple-600">
                  <Shield size={18} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                  Avg
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-800">{stats.avgSafetyScore}</h2>
              <p className="text-xs text-gray-500 font-medium">Safety Score</p>
            </div>
          </div>

          {/* User Management CRUD Table */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            {/* Table Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base">User Document Management (MongoDB CRUD)</h3>
                <p className="text-xs text-gray-500">Querying Express backend using req.query, req.params, req.body</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Status Filter */}
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                  <Filter size={14} className="text-gray-500" />
                  <span className="font-bold text-gray-600">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent font-bold text-purple-700 focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Role Filter */}
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-600">Role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-transparent font-bold text-purple-700 focus:outline-none"
                  >
                    <option value="All">All Roles</option>
                    <option value="Protected User">Protected User</option>
                    <option value="Member">Member</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="py-12 text-center text-gray-400 text-xs flex flex-col items-center gap-2">
                <RefreshCw className="animate-spin text-purple-600" size={24} />
                Fetching MongoDB Document Collections...
              </div>
            ) : users.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-xs">
                No MongoDB user documents matched query parameters <code className="bg-gray-100 px-2 py-0.5 rounded">req.query</code>.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 font-bold border-b border-gray-100">
                      <th className="p-3 rounded-l-xl">User Document</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Status (PATCH)</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Score</th>
                      <th className="p-3 text-right rounded-r-xl">HTTP Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr
                        key={user._id || user.id}
                        onClick={() => openInspectModal(user)}
                        className="hover:bg-purple-50/40 cursor-pointer transition-colors group"
                      >
                        {/* User Details */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                              {user.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'U'}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-gray-500 font-mono">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="p-3 font-semibold text-gray-700">{user.role}</td>

                        {/* Status with Quick PATCH Toggle */}
                        <td className="p-3">
                          <button
                            onClick={(e) => handleToggleStatus(user, e)}
                            title="Click to PATCH status"
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all ${
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : user.status === 'Pending'
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {user.status}
                          </button>
                        </td>

                        {/* City */}
                        <td className="p-3 text-gray-600">{user.city}</td>

                        {/* Safety Score */}
                        <td className="p-3 font-bold text-purple-700">{user.safetyScore}/100</td>

                        {/* Actions */}
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* GET (Inspect BSON) */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openInspectModal(user);
                              }}
                              title="GET /api/users/:id - Inspect BSON Document"
                              className="p-1.5 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-lg transition-colors"
                            >
                              <Eye size={14} />
                            </button>

                            {/* PUT (Edit Document) */}
                            <button
                              onClick={(e) => openEditModal(user, e)}
                              title="PUT /api/users/:id - Full Document Replace"
                              className="p-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>

                            {/* DELETE (Delete Document) */}
                            <button
                              onClick={(e) => handleDeleteUser(user, e)}
                              title="DELETE /api/users/:id - Remove Document"
                              className="p-1.5 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Live System Logs & Activity) */}
        <div className="space-y-6">
          {/* Active Admin Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-tr from-purple-600 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md">
                SG
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Shreya Gupta</h3>
                <p className="text-xs text-purple-700 font-semibold">Protected User & System Admin</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="font-extrabold text-gray-900 text-lg">{users.length}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">MongoDB Docs</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="font-extrabold text-gray-900 text-lg">5</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">HTTP Methods</p>
              </div>
            </div>

            <div className="text-[11px] text-gray-600 space-y-1.5 border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Node Engine:</span>
                <span className="font-mono font-bold text-purple-700">v24 (libuv async)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Database URI:</span>
                <span className="font-mono font-bold text-emerald-600 truncate max-w-[150px]">
                  localhost:27017
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Module Format:</span>
                <span className="font-mono font-bold text-amber-600">ES Modules (import)</span>
              </div>
            </div>
          </div>

          {/* Activity Logs (MongoDB Collection) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <Clock size={16} className="text-purple-600" /> Recent MongoDB Activity Logs
            </h3>

            {recentActivity.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No activity logged yet.</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((log, idx) => (
                  <div key={log._id || idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-purple-700 text-[10px] bg-purple-100 px-2 py-0.5 rounded">
                        {log.action}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-[11px] leading-tight">{log.details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
        title={editingUser ? `Edit User (PUT /api/users/${editingUser._id})` : 'Create User (POST /api/users)'}
      />

      <UserDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        user={inspectingUser}
      />
    </>
  );
};

export default Dashboard;