import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Calendar, Settings } from 'lucide-react';
import { auth } from '../services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Header({ user, setUser }: HeaderProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.logout();
    setUser(null);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TravelEase
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link to="/destinations" className="text-gray-600 hover:text-blue-600">
              Destinations
            </Link>
            <Link to="/hotels" className="text-gray-600 hover:text-blue-600">
              Hotels
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Welcome, {user.firstName}
                </span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <Settings className="h-5 w-5 mr-1" />
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <Link
                  to="/bookings"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Calendar className="h-5 w-5 mr-1" />
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/admin/login"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Admin Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="block text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Destinations
            </Link>
            <Link
              to="/hotels"
              className="block text-gray-600 hover:text-blue-600"
              onClick={toggleMobileMenu}
            >
              Hotels
            </Link>
            {user ? (
              <>
                <div className="pt-4 border-t border-gray-200">
                  <span className="block text-gray-600 mb-2">
                    Welcome, {user.firstName}
                  </span>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center text-purple-600 hover:text-purple-700 font-medium mb-2"
                      onClick={toggleMobileMenu}
                    >
                      <Settings className="h-5 w-5 mr-1" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-600 hover:text-blue-600 mb-2"
                    onClick={toggleMobileMenu}
                  >
                    <User className="h-5 w-5 mr-1" />
                    Profile
                  </Link>
                  <Link
                    to="/bookings"
                    className="flex items-center text-gray-600 hover:text-blue-600 mb-2"
                    onClick={toggleMobileMenu}
                  >
                    <Calendar className="h-5 w-5 mr-1" />
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/admin/login"
                  className="block text-purple-600 hover:text-purple-700 font-medium"
                  onClick={toggleMobileMenu}
                >
                  Admin Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}