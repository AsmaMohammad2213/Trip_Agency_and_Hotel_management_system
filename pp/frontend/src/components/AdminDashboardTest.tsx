import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Hotel, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  LogOut, 
  AlertCircle
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function AdminDashboardTest() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔧 AdminDashboardTest: Checking authentication...');
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const userData = localStorage.getItem('user');
    
    console.log('🔧 AdminDashboardTest: Auth check', { token: !!token, isAdmin, userData: !!userData });
    
    if (token && isAdmin === 'true' && userData) {
      try {
        const userObj = JSON.parse(userData);
        setUser(userObj);
        console.log('🔧 AdminDashboardTest: User set', userObj);
      } catch (err) {
        console.error('🔧 AdminDashboardTest: Error parsing user data', err);
        setError('Invalid user data');
      }
    } else {
      console.log('🔧 AdminDashboardTest: No valid auth, redirecting to login');
      navigate('/admin/login');
      return;
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setUser(null);
    navigate('/admin/login');
  };

  const testBackendConnection = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/stats/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(`Backend connection successful!\nStats: ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorData = await response.json();
        alert(`Backend connection failed: ${errorData.message}`);
      }
    } catch (err) {
      alert(`Backend connection error: ${err}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin test dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-900">Authentication Error</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Admin Dashboard Test</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={testBackendConnection}
                className="flex items-center px-3 py-2 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
              >
                Test Backend
              </button>
              <a
                href="/"
                className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              >
                ← Back to Main Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-900 mb-4">
              ✅ Admin Dashboard Test Successful!
            </h2>
            <p className="text-green-700 mb-4">
              You are successfully logged in as an admin. The dashboard is working correctly.
            </p>
            <div className="space-y-2">
              <p><strong>User:</strong> {user?.firstName} {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
            </div>
          </div>

          {/* Test Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Test Actions
            </h2>
            <div className="space-x-4">
              <button
                onClick={testBackendConnection}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Test Backend Connection
              </button>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Go to Full Dashboard
              </button>
              <button
                onClick={() => navigate('/test-admin')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Back to Test Page
              </button>
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-900 mb-4">
              Debug Information
            </h2>
            <div className="bg-white p-4 rounded border">
              <pre className="text-sm overflow-auto">
                {JSON.stringify({
                  user,
                  token: localStorage.getItem('token') ? 'Present' : 'Missing',
                  isAdmin: localStorage.getItem('isAdmin'),
                  timestamp: new Date().toISOString()
                }, null, 2)}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">
              Next Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-purple-700">
              <li>If you can see this page, the admin authentication is working</li>
              <li>Click "Test Backend Connection" to verify the backend is working</li>
              <li>Click "Go to Full Dashboard" to access the complete admin dashboard</li>
              <li>If the full dashboard is blank, check the browser console for errors</li>
              <li>Use the debug information above to troubleshoot any issues</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 