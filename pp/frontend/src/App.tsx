import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TestAdmin from './pages/TestAdmin';
import AdminDashboardTest from './components/AdminDashboardTest';
import AdminDashboardFallback from './components/AdminDashboardFallback';
import UserBookingsPage from './pages/UserBookingsPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import HotelsPage from './pages/HotelsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import DatabasePopulator from './components/DatabasePopulator';
import { auth } from './services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Try to get user from backend
          try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              setUser(data.user);
            } else {
              // Token is invalid, clear it
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('isAdmin');
            }
          } catch (error) {
            console.error('Error getting user from backend:', error);
            // If backend fails, check if we have stored user data
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} setUser={setUser} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/admin/login" element={<AdminLoginPage setUser={setUser} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/test-admin" element={<TestAdmin />} />
            <Route path="/simple-test" element={<TestAdmin />} />
            <Route path="/admin-test" element={<AdminDashboardTest />} />
            <Route path="/admin-fallback" element={<AdminDashboardFallback />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/:id" element={<HotelDetailPage />} />
            <Route path="/bookings" element={<UserBookingsPage />} />
            <Route 
              path="/admin/populate-database" 
              element={
                <ProtectedAdminRoute user={user}>
                  <div className="pt-20 min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 py-12">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Database Setup</h1>
                        <DatabasePopulator />
                      </div>
                    </div>
                  </div>
                </ProtectedAdminRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}