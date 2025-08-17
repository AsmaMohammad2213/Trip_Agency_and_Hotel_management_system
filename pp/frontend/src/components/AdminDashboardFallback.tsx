import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardFallback() {
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Collect debug information
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    const user = localStorage.getItem('user');
    
    setDebugInfo({
      token: token ? 'Present' : 'Missing',
      isAdmin: isAdmin,
      user: user ? JSON.parse(user) : null,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }, []);

  const testBackend = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/stats/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(`Backend working! Stats: ${JSON.stringify(data, null, 2)}`);
      } else {
        alert(`Backend error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      alert(`Backend error: ${error}`);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setDebugInfo({});
    alert('Storage cleared!');
  };

  const goToTestPage = () => {
    navigate('/test-admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🔧 Admin Dashboard Fallback
          </h1>
          
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Dashboard Status
              </h2>
              <p className="text-blue-700 mb-4">
                This is a fallback page that shows when the main admin dashboard fails to load.
                The main dashboard should have loaded automatically.
              </p>
              <div className="space-y-2">
                <p><strong>Token:</strong> {debugInfo.token}</p>
                <p><strong>Admin Flag:</strong> {debugInfo.isAdmin}</p>
                <p><strong>User:</strong> {debugInfo.user ? `${debugInfo.user.firstName} ${debugInfo.user.lastName}` : 'None'}</p>
                <p><strong>Role:</strong> {debugInfo.user?.role || 'None'}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-x-4">
                <button
                  onClick={testBackend}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Test Backend
                </button>
                <button
                  onClick={goToTestPage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Go to Test Page
                </button>
                <button
                  onClick={clearStorage}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Clear Storage
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Reload Page
                </button>
              </div>
            </div>

            {/* Debug Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-900 mb-4">
                Debug Information
              </h2>
              <pre className="bg-white p-4 rounded border text-sm overflow-auto max-h-64">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>

            {/* Instructions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">
                Troubleshooting Steps
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-purple-700">
                <li>Click "Test Backend" to verify the backend is working</li>
                <li>Click "Go to Test Page" to use the working test page</li>
                <li>If you see errors, click "Clear Storage" and try again</li>
                <li>Open browser dev tools (F12) and check the Console tab</li>
                <li>Look for any red error messages and share them</li>
                <li>Try accessing: <a href="/test-admin" className="text-blue-600 underline">http://localhost:5173/test-admin</a></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 