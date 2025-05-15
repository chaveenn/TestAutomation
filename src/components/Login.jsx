import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is already set in the AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md" data-testid="login-form">
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 hover:shadow-lg"
          data-testid="login-form-element"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Login Test Automation</h1>
          <p className="text-center text-gray-600 mb-6">Demo application for Cypress testing</p>
          
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign In</h2>
          
          {error && (
            <div 
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center"
              data-testid="error-message"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Invalid email or password combination</span>
            </div>
          )}
          
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-medium mb-2" 
              htmlFor="email"
              data-testid="email-label"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className={`appearance-none border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors`}
                id="email"
                type="email"
                name="email"
                placeholder="test@example.com"
                value={email}
                onChange={handleChange}
                data-testid="email-input"
              />
            </div>
            {validationErrors.email && (
              <p className="text-red-500 text-xs italic mt-1" data-testid="email-error">
                {validationErrors.email}
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <label 
              className="block text-gray-700 text-sm font-medium mb-2" 
              htmlFor="password"
              data-testid="password-label"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className={`appearance-none border ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors`}
                id="password"
                type="password"
                name="password"
                placeholder="•••••••••••"
                value={password}
                onChange={handleChange}
                data-testid="password-input"
              />
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-xs italic mt-1" data-testid="password-error">
                {validationErrors.password}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
              data-testid="login-button"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </button>
            <Link
              to="/forgot-password"
              className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-gray-600 text-sm mb-4 p-4 bg-gray-50 rounded">
            For testing purposes, use: <br />
            <span className="font-mono">test@example.com / password123</span>
          </div>
          
          <div className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-500 hover:text-blue-700 transition-colors"
              data-testid="signup-link"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}