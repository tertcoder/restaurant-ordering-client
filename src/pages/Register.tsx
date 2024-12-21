import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../api';
import { useAuthStore } from '../store/useAuthStore';
import AuthForm from '../components/auth/AuthForm';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (username: string, password: string, email: string) => {
    setLoading(true);
    try {
      const userData = await auth.register(username, password, email);
      setUser(userData);
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        loading={loading}
      />
    </div>
  );
};

export default Register;