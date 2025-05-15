import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

export default function Profile() {
  const { currentUser, logout, fetchUserProfile, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchUserProfile()
      .catch(error => {
        setError('Failed to load user profile');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchUserProfile]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <User size={36} className="text-blue-500" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6" data-testid="profile-heading">User Profile</h2>
        
        {error && 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        }
        
        {loading ? (
          <p className="text-center" data-testid="loading-indicator">Loading profile...</p>
        ) : (
          <div data-testid="profile-data">
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-bold text-sm text-gray-500">Email</p>
              <p data-testid="profile-email" className="text-gray-800">{currentUser?.email}</p>
            </div>
            
            {userProfile && (
              <>
                <div className="mb-4 p-4 bg-gray-50 rounded">
                  <p className="font-bold text-sm text-gray-500">Name</p>
                  <p data-testid="profile-name" className="text-gray-800">{userProfile.name}</p>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded">
                  <p className="font-bold text-sm text-gray-500">Role</p>
                  <p data-testid="profile-role" className="text-gray-800">{userProfile.role}</p>
                </div>
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <p className="font-bold text-sm text-gray-500">Joined</p>
                  <p data-testid="profile-date" className="text-gray-800">
                    {new Date(userProfile.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </>
            )}
            
            <button 
              onClick={handleLogout}
              data-testid="logout-button" 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center transition-colors duration-200"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}