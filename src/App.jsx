import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import PageNotFound from './Pages/NotFound';
import AppLayout from './components/AppLayout';
import { Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
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
        <Route path="/register" element={<Register />} />
        <Route
          path="/logout"
          element={<Logout onLogout={setIsLoggedIn} />}
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;