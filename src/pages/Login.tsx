import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../api';
import { useAuthStore } from '../store/useAuthStore';
import AuthForm from '../components/auth/AuthForm';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const userData = await auth.login(username, password);
      setUser(userData);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        loading={loading}
      />
    </div>
  );
};

export default Login;