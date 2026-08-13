import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import EmergencyContacts from './Pages/EmergencyContacts';
import EmergencyHistory from './Pages/EmergencyHistory';
import LiveLocation from './Pages/LiveLocation';
import SettingsPage from './Pages/Setting';
import Notifications from './Pages/Notifications';
import PageNotFound from './Pages/NotFound';
import AppLayout from './components/AppLayout';
import { authAPI } from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getProfile();
        if (response.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      }
    }
    setLoading(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
          />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/logout" 
            element={<Logout onLogout={setIsLoggedIn} />} 
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <Profile />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/emergency-contacts"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <EmergencyContacts />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/emergency-history"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <EmergencyHistory />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/live-location"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <LiveLocation />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <Notifications />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <AppLayout>
                  <SettingsPage />
                </AppLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;