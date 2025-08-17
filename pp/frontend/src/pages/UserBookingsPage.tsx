import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, Users, DollarSign, Clock, CheckCircle, XCircle, Loader, Package, Eye, Trash2 } from 'lucide-react';
import BookingDetailsModal from '../components/BookingDetailsModal';

interface UserBooking {
  _id: string;
  bookingType: 'hotel' | 'destination';
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  guests: number;
  createdAt: string;
  checkIn?: string;
  checkOut?: string;
  startDate?: string;
  hotel?: {
    name: string;
    location: string;
    image: string;
  };
  destination?: {
    name: string;
    country: string;
    image: string;
  };
}

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState<string | null>(null);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your bookings');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/bookings/my-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError('Failed to load bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      setCancellingBooking(bookingId);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update the booking status in the local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId 
              ? { ...booking, status: 'cancelled' as const }
              : booking
          )
        );
        
        // Close modal if it's open for this booking
        if (selectedBooking?._id === bookingId) {
          setIsModalOpen(false);
          setSelectedBooking(null);
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to cancel booking: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingBooking(null);
    }
  };

  const openBookingDetails = (booking: UserBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeBookingDetails = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading your bookings...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Bookings</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchUserBookings}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your hotel and destination bookings</p>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't made any bookings yet. Start exploring our hotels and destinations!
              </p>
              <div className="space-x-4">
                <a 
                  href="/hotels"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Hotels
                </a>
                <a 
                  href="/destinations"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Destinations
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={booking.hotel?.image || booking.destination?.image}
                        alt={booking.hotel?.name || booking.destination?.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {booking.hotel?.name || booking.destination?.name}
                            </h3>
                            <p className="text-gray-600 flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {booking.hotel?.location || booking.destination?.country}
                            </p>
                            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                ${booking.totalPrice}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {booking.bookingType === 'hotel' 
                                  ? `${new Date(booking.checkIn!).toLocaleDateString()} - ${new Date(booking.checkOut!).toLocaleDateString()}`
                                  : new Date(booking.checkIn!).toLocaleDateString()
                                }
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center mb-2">
                              {getStatusIcon(booking.status)}
                              <span className={`ml-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              Booked on {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {booking.bookingType === 'hotel' ? 'Hotel Booking' : 'Destination Package'}
                            </span>
                            <div className="flex space-x-3">
                              <button 
                                onClick={() => openBookingDetails(booking)}
                                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </button>
                              
                              {booking.status === 'pending' && (
                                <button 
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to cancel this booking?')) {
                                      cancelBooking(booking._id);
                                    }
                                  }}
                                  disabled={cancellingBooking === booking._id}
                                  className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                                >
                                  {cancellingBooking === booking._id ? (
                                    <Loader className="h-4 w-4 mr-1 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4 mr-1" />
                                  )}
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={closeBookingDetails}
        onCancelBooking={cancelBooking}
      />
    </div>
  );
} 