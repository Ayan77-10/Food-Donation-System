import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css';
import { useNavigate } from '@tanstack/react-router';
import axios from 'axios';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          navigate(role === 'ngo' ? '/dashboard/ngo' : '/dashboard/donor', { replace: true });
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  },[navigate])
  return (
    <div className="auth-page">
      {showLogin ? (
        <LoginForm state={setShowLogin} />
      ) : (
        <RegisterForm state={setShowLogin} />
      )}
    </div>
  )
}

export default AuthPage
