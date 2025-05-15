import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, Calendar, Shield } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen" data-testid="dashboard">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-md flex items-center transition-colors duration-200"
            data-testid="logout-button"
          >
            <LogOut className="h-4 w-4 mr-2" /> 
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Welcome!</h2>
            
            {error && 
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                {error}
              </div>
            }

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-blue-700">
                You have successfully logged in to the secure dashboard.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-700 mb-3">Your Profile</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">User ID</p>
                    <p className="text-sm text-gray-800" data-testid="user-id">{currentUser?.uid}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-800" data-testid="user-email">{currentUser?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Authentication Status</p>
                    <p className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs inline-flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span> Authenticated
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}