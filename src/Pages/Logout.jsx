import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (onLogout) {
      onLogout(false);
    }
    navigate('/', { replace: true });
  }, [navigate, onLogout]);

  return null;
};

export default Logout;
