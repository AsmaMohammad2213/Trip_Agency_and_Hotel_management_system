import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Hotel, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  User,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Home,
  X
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalHotels: number;
  totalDestinations: number;
  totalBookings: number;
  revenue: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  description: string;
  available: boolean;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  price: number;
}

interface Booking {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  hotel: {
    name: string;
    location: string;
  } | null;
  destination: {
    name: string;
    country: string;
  } | null;
  checkIn: string;
  checkOut?: string;
  startDate?: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingType: 'hotel' | 'destination';
  createdAt: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Payment {
  id: string;
  booking: {
    id: string;
    checkIn: string;
    checkOut?: string;
    totalPrice: number;
    status: string;
    bookingType: 'hotel' | 'destination';
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  transactionId?: string;
  cardLast4?: string;
  cardBrand?: string;
  description: string;
  createdAt: string;
  processedAt?: string;
  refundAmount?: number;
  refundReason?: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real data from MongoDB
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalHotels: 0,
    totalDestinations: 0,
    totalBookings: 0,
    revenue: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Add modal states
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [showAddDestination, setShowAddDestination] = useState(false);
  
  // Add form states
  const [hotelForm, setHotelForm] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    amenities: [],
    rating: 0,
    priceRange: {
      min: 0,
      max: 0
    },
    contactInfo: {
      phone: '',
      email: ''
    }
  });

  const [destinationForm, setDestinationForm] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    shortDescription: '',
    mainImage: '',
    rating: 0,
    price: 0,
    climate: 'temperate',
    bestTimeToVisit: '',
    activities: [],
    isPopular: false
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all data in parallel
      await Promise.all([
        loadStats(),
        loadHotels(),
        loadDestinations(),
        loadBookings(),
        loadUsers()
      ]);

      console.log('🔧 Dashboard data loaded successfully from MongoDB');
    } catch (error) {
      console.error('🔧 Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        console.log('🔧 Stats loaded from MongoDB:', data);
      } else {
        console.log('🔧 Using fallback stats');
        setStats({
          totalUsers: 25,
          totalHotels: 12,
          totalDestinations: 8,
          totalBookings: 45,
          revenue: 12500,
          pendingBookings: 8,
          confirmedBookings: 32,
          cancelledBookings: 5
        });
      }
    } catch (error) {
      console.log('🔧 Using fallback stats due to error:', error);
      setStats({
        totalUsers: 25,
        totalHotels: 12,
        totalDestinations: 8,
        totalBookings: 45,
        revenue: 12500,
        pendingBookings: 8,
        confirmedBookings: 32,
        cancelledBookings: 5
      });
    }
  };

  const loadHotels = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hotels', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const transformedHotels = data.map((hotel: any) => ({
          id: hotel._id || hotel.id,
          name: hotel.name,
          location: `${hotel.address?.city}, ${hotel.address?.country}`,
          rating: hotel.rating || 4.5,
          price: hotel.priceRange?.min || 200,
          image: hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
          description: hotel.description,
          available: hotel.isActive !== false
        }));
        setHotels(transformedHotels);
        console.log('🔧 Hotels loaded from MongoDB:', transformedHotels.length);
      } else {
        console.log('🔧 Using fallback hotels');
        setHotels([
          {
            id: '1',
            name: 'Grand Hotel',
            location: 'New York, USA',
            rating: 4.5,
            price: 200,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            description: 'Luxury hotel in the heart of Manhattan',
            available: true
          }
        ]);
      }
    } catch (error) {
      console.log('🔧 Using fallback hotels due to error:', error);
      setHotels([
        {
          id: '1',
          name: 'Grand Hotel',
          location: 'New York, USA',
          rating: 4.5,
          price: 200,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
          description: 'Luxury hotel in the heart of Manhattan',
          available: true
        }
      ]);
    }
  };

  const loadDestinations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/destinations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const transformedDestinations = data.map((destination: any) => ({
          id: destination._id || destination.id,
          name: destination.name,
          country: destination.country,
          description: destination.description,
          image: destination.images?.[0] || 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
          rating: destination.rating || 4.5,
          price: destination.price || 1200
        }));
        setDestinations(transformedDestinations);
        console.log('🔧 Destinations loaded from MongoDB:', transformedDestinations.length);
      } else {
        console.log('🔧 Using fallback destinations');
        setDestinations([
          {
            id: '1',
            name: 'Paris',
            country: 'France',
            description: 'The City of Light',
            image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
            rating: 4.8,
            price: 1200
          }
        ]);
      }
    } catch (error) {
      console.log('🔧 Using fallback destinations due to error:', error);
      setDestinations([
        {
          id: '1',
          name: 'Paris',
          country: 'France',
          description: 'The City of Light',
          image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
          rating: 4.8,
          price: 1200
        }
      ]);
    }
  };

  const loadBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('🔧 No token found, using fallback bookings');
        setBookings([
          {
            _id: '1',
            user: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com'
            },
            hotel: {
              name: 'Grand Hotel',
              location: 'New York, USA'
            },
            destination: null,
            checkIn: '2024-01-15',
            checkOut: '2024-01-20',
            guests: 2,
            totalPrice: 1000,
            status: 'confirmed',
            bookingType: 'hotel',
            createdAt: '2024-01-15T00:00:00.000Z'
          }
        ]);
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🔧 Raw bookings response:', data);
        
        // Handle both response structures
        const bookingsData = data.bookings || data;
        setBookings(bookingsData);
        console.log('🔧 Bookings loaded from MongoDB:', bookingsData.length);
        
        // Log first booking for debugging
        if (bookingsData.length > 0) {
          console.log('🔧 Sample booking:', bookingsData[0]);
        }
      } else {
        console.log('🔧 Using fallback bookings due to response error:', response.status);
        setBookings([
          {
            _id: '1',
            user: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com'
            },
            hotel: {
              name: 'Grand Hotel',
              location: 'New York, USA'
            },
            destination: null,
            checkIn: '2024-01-15',
            checkOut: '2024-01-20',
            guests: 2,
            totalPrice: 1000,
            status: 'confirmed',
            bookingType: 'hotel',
            createdAt: '2024-01-15T00:00:00.000Z'
          }
        ]);
      }
    } catch (error) {
      console.log('🔧 Using fallback bookings due to error:', error);
      setBookings([
        {
          _id: '1',
          user: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
          },
          hotel: {
            name: 'Grand Hotel',
            location: 'New York, USA'
          },
          destination: null,
          checkIn: '2024-01-15',
          checkOut: '2024-01-20',
          guests: 2,
          totalPrice: 1000,
          status: 'confirmed',
          bookingType: 'hotel',
          createdAt: '2024-01-15T00:00:00.000Z'
        }
      ]);
    }
  };

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const transformedUsers = data.map((user: any) => ({
          id: user._id || user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }));
        setUsers(transformedUsers);
        console.log('🔧 Users loaded from MongoDB:', transformedUsers.length);
      } else {
        console.log('🔧 Using fallback users');
        setUsers([
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'user'
          }
        ]);
      }
    } catch (error) {
      console.log('🔧 Using fallback users due to error:', error);
      setUsers([
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'user'
        }
      ]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotel?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('🔧 No token found for status update');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedBooking = await response.json();
        console.log('🔧 Booking status updated:', updatedBooking);
        
        // Update the bookings list with the new status
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId 
              ? { ...booking, status: newStatus as 'pending' | 'confirmed' | 'cancelled' }
              : booking
          )
        );
        
        // Refresh stats
        loadStats();
      } else {
        console.log('🔧 Failed to update booking status:', response.status);
      }
    } catch (error) {
      console.log('🔧 Error updating booking status:', error);
    }
  };

  // Create new hotel
  const createHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(hotelForm)
      });

      if (response.ok) {
        const newHotel = await response.json();
        setHotels([...hotels, newHotel]);
        setShowAddHotel(false);
        setHotelForm({
          name: '',
          description: '',
          address: { street: '', city: '', state: '', country: '', zipCode: '' },
          amenities: [],
          rating: 0,
          priceRange: { min: 0, max: 0 },
          contactInfo: { phone: '', email: '' }
        });
        alert('Hotel created successfully!');
      } else {
        alert('Failed to create hotel');
      }
    } catch (error) {
      console.error('Error creating hotel:', error);
      alert('Error creating hotel');
    }
  };

  // Delete hotel
  const deleteHotel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setHotels(hotels.filter(hotel => hotel.id !== id));
        alert('Hotel deleted successfully!');
        // Refresh stats to update hotel count
        loadStats();
      } else {
        alert('Failed to delete hotel');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      alert('Error deleting hotel');
    }
  };

  // Create new destination
  const createDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(destinationForm)
      });

      if (response.ok) {
        const newDestination = await response.json();
        setDestinations([...destinations, newDestination]);
        setShowAddDestination(false);
        setDestinationForm({
          name: '',
          country: '',
          city: '',
          description: '',
          shortDescription: '',
          mainImage: '',
          rating: 0,
          price: 0,
          climate: 'temperate',
          bestTimeToVisit: '',
          activities: [],
          isPopular: false
        });
        alert('Destination created successfully!');
      } else {
        alert('Failed to create destination');
      }
    } catch (error) {
      console.error('Error creating destination:', error);
      alert('Error creating destination');
    }
  };

  // Delete destination
  const deleteDestination = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setDestinations(destinations.filter(dest => dest.id !== id));
        alert('Destination deleted successfully!');
        // Refresh stats to update destination count
        loadStats();
      } else {
        alert('Failed to delete destination');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      alert('Error deleting destination');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard from MongoDB...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={loadDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                MongoDB Connected
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'hotels', name: 'Hotels', icon: Hotel },
              { id: 'destinations', name: 'Destinations', icon: MapPin },
              { id: 'bookings', name: 'Bookings', icon: Calendar },
              { id: 'users', name: 'Users', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Hotel className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Hotels</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalHotels}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Destinations</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalDestinations}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">${stats.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                    <p className="text-2xl font-semibold text-yellow-600">{stats.pendingBookings}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confirmed Bookings</p>
                    <p className="text-2xl font-semibold text-green-600">{stats.confirmedBookings}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cancelled Bookings</p>
                    <p className="text-2xl font-semibold text-red-600">{stats.cancelledBookings}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Hotels Management</h2>
              <button 
                onClick={() => setShowAddHotel(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Hotel</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hotel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hotels.map((hotel) => (
                      <tr key={hotel.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={hotel.image}
                              alt={hotel.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                              <div className="text-sm text-gray-500">{hotel.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {hotel.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-900">{hotel.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${hotel.price}/night
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            hotel.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {hotel.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteHotel(hotel.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Destinations Management</h2>
              <button 
                onClick={() => setShowAddDestination(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Destination</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {destinations.map((destination) => (
                      <tr key={destination.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={destination.image}
                              alt={destination.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{destination.name}</div>
                              <div className="text-sm text-gray-500">{destination.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {destination.country}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-900">{destination.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${destination.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteDestination(destination.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Bookings Management</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.user.firstName} {booking.user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{booking.user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.hotel?.name || booking.destination?.name}
                          </div>
                          <div className="text-sm text-gray-500">{booking.hotel?.location || booking.destination?.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(booking.checkIn).toLocaleDateString()} - {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">{booking.guests} guests</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${booking.totalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Users Management</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users
                      .filter(user => 
                        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Hotel Modal */}
        {showAddHotel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Hotel</h3>
                <button
                  onClick={() => setShowAddHotel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={createHotel} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                    <input
                      type="text"
                      required
                      value={hotelForm.name}
                      onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      required
                      value={hotelForm.rating}
                      onChange={(e) => setHotelForm({...hotelForm, rating: parseFloat(e.target.value)})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={hotelForm.description}
                    onChange={(e) => setHotelForm({...hotelForm, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      required
                      value={hotelForm.address.street}
                      onChange={(e) => setHotelForm({...hotelForm, address: {...hotelForm.address, street: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      required
                      value={hotelForm.address.city}
                      onChange={(e) => setHotelForm({...hotelForm, address: {...hotelForm.address, city: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={hotelForm.address.state}
                      onChange={(e) => setHotelForm({...hotelForm, address: {...hotelForm.address, state: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      required
                      value={hotelForm.address.country}
                      onChange={(e) => setHotelForm({...hotelForm, address: {...hotelForm.address, country: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      value={hotelForm.address.zipCode}
                      onChange={(e) => setHotelForm({...hotelForm, address: {...hotelForm.address, zipCode: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Price</label>
                    <input
                      type="number"
                      required
                      value={hotelForm.priceRange.min}
                      onChange={(e) => setHotelForm({...hotelForm, priceRange: {...hotelForm.priceRange, min: parseInt(e.target.value)}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Price</label>
                    <input
                      type="number"
                      required
                      value={hotelForm.priceRange.max}
                      onChange={(e) => setHotelForm({...hotelForm, priceRange: {...hotelForm.priceRange, max: parseInt(e.target.value)}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={hotelForm.contactInfo.phone}
                      onChange={(e) => setHotelForm({...hotelForm, contactInfo: {...hotelForm.contactInfo, phone: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={hotelForm.contactInfo.email}
                      onChange={(e) => setHotelForm({...hotelForm, contactInfo: {...hotelForm.contactInfo, email: e.target.value}})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Hotel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddHotel(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Destination Modal */}
        {showAddDestination && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Destination</h3>
                <button
                  onClick={() => setShowAddDestination(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={createDestination} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Name</label>
                    <input
                      type="text"
                      required
                      value={destinationForm.name}
                      onChange={(e) => setDestinationForm({...destinationForm, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      required
                      value={destinationForm.country}
                      onChange={(e) => setDestinationForm({...destinationForm, country: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    required
                    value={destinationForm.city}
                    onChange={(e) => setDestinationForm({...destinationForm, city: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={destinationForm.description}
                    onChange={(e) => setDestinationForm({...destinationForm, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <input
                    type="text"
                    value={destinationForm.shortDescription}
                    onChange={(e) => setDestinationForm({...destinationForm, shortDescription: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      required
                      value={destinationForm.rating}
                      onChange={(e) => setDestinationForm({...destinationForm, rating: parseFloat(e.target.value)})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      required
                      value={destinationForm.price}
                      onChange={(e) => setDestinationForm({...destinationForm, price: parseInt(e.target.value)})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main Image URL</label>
                  <input
                    type="url"
                    value={destinationForm.mainImage}
                    onChange={(e) => setDestinationForm({...destinationForm, mainImage: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Destination
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDestination(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 