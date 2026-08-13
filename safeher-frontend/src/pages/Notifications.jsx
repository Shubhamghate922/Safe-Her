import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Clock, Loader2, Trash2 } from 'lucide-react';
import { notificationsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationsAPI.getAll();
      if (response.success) {
        setNotifications(response.data);
        setUnreadCount(response.unreadCount || 0);
      }
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await notificationsAPI.markAsRead(id);
      if (response.success) {
        toast.success('Marked as read');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await notificationsAPI.markAllAsRead();
      if (response.success) {
        toast.success('All notifications marked as read');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await notificationsAPI.delete(id);
      if (response.success) {
        toast.success('Notification deleted');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all notifications?')) return;
    try {
      const response = await notificationsAPI.clearAll();
      if (response.success) {
        toast.success('All notifications cleared');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to clear notifications');
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Bell className="text-purple-600" size={24} />
              Notifications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Stay updated with alerts and notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            {notifications.some(n => !n.isRead) && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-all"
              >
                Mark All as Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold hover:bg-red-100 transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <Bell size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-semibold text-gray-800">No notifications</p>
              <p className="text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all ${
                  !notification.isRead ? 'border-purple-200 bg-purple-50/50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${!notification.isRead ? 'bg-purple-200' : 'bg-gray-200'}`}>
                      <Bell size={16} className={!notification.isRead ? 'text-purple-600' : 'text-gray-600'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{new Date(notification.createdAt).toLocaleString()}</span>
                        {notification.priority === 'high' && (
                          <span className="text-red-500 font-semibold">• Urgent</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;