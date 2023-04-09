import React from 'react';
import { useLocation } from 'react-router-dom';

import { Register } from './Register/Register';
import { Login } from './Login/Login';
import './Auth.css';
import { NavBar } from '../common/NavBar/NavBar';

export const Auth = () => {
  const location = useLocation();
  return (
    <>
      <NavBar page="login" />
      <div className="Auth">
        { location.pathname === '/register' ? <Register /> : <Login /> }
      </div>
    </>
  );
};
