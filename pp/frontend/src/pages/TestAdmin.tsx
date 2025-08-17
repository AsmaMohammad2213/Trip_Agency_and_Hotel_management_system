import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function TestAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>({});

  const testAdminLogin = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('🔧 Testing admin login...');
      
      // Test admin login
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'admin123'
        })
      });

      console.log('🔧 Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('🔧 Login successful:', data);
      
      if (data.token && data.user) {
        // Store admin data
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setSuccess('Admin login successful! Redirecting to dashboard...');
        
        // Update debug info
        setDebugInfo({
          token: data.token ? 'Present' : 'Missing',
          user: data.user,
          isAdmin: data.user.role === 'admin',
          timestamp: new Date().toISOString()
        });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('🔧 Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const checkCurrentState = () => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const user = localStorage.getItem('user');
    
    setDebugInfo({
      token: token ? 'Present' : 'Missing',
      isAdmin: isAdmin,
      user: user ? JSON.parse(user) : null,
      timestamp: new Date().toISOString()
    });
  };

  const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setDebugInfo({});
    setSuccess('Storage cleared');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🔧 Admin Dashboard Test
          </h1>
          
          <div className="space-y-6">
            {/* Test Admin Login */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Test Admin Login
              </h2>
              <p className="text-blue-700 mb-4">
                This will test the admin login and automatically redirect you to the dashboard.
              </p>
              <div className="space-y-2 mb-4">
                <p><strong>Email:</strong> admin@example.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
              <button
                onClick={testAdminLogin}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Testing Login...' : 'Test Admin Login & Dashboard'}
              </button>
            </div>

            {/* Debug Actions */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Debug Actions
              </h2>
              <div className="space-x-4">
                <button
                  onClick={checkCurrentState}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Check Current State
                </button>
                <button
                  onClick={clearStorage}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Clear Storage
                </button>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <strong>Success:</strong> {success}
              </div>
            )}

            {/* Debug Information */}
            {Object.keys(debugInfo).length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                  Debug Information
                </h3>
                <pre className="bg-white p-4 rounded border text-sm overflow-auto">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">
                Instructions
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-purple-700">
                <li>Make sure your backend server is running on port 5000</li>
                <li>Click "Test Admin Login & Dashboard" to test the login</li>
                <li>If successful, you'll be redirected to the admin dashboard</li>
                <li>If you see a blank page, check the browser console for errors</li>
                <li>Use "Check Current State" to see what's stored in localStorage</li>
                <li>Use "Clear Storage" to reset everything and try again</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 