import React from 'react';
import { X, Calendar, MapPin, Users, DollarSign, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

interface BookingDetailsModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking?: (bookingId: string) => void;
}

export default function BookingDetailsModal({ booking, isOpen, onClose, onCancelBooking }: BookingDetailsModalProps) {
  if (!isOpen || !booking) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
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

  const handleCancelBooking = () => {
    if (onCancelBooking && booking.status === 'pending') {
      onCancelBooking(booking._id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Booking Header */}
            <div className="flex items-start space-x-4">
              <img
                src={booking.hotel?.image || booking.destination?.image}
                alt={booking.hotel?.name || booking.destination?.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {booking.hotel?.name || booking.destination?.name}
                </h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.hotel?.location || booking.destination?.country}
                </p>
                
                <div className="flex items-center mt-3">
                  {getStatusIcon(booking.status)}
                  <span className={`ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Booking Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">
                        {booking.bookingType === 'hotel' ? 'Hotel Booking' : 'Destination Package'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Check-in:</span>
                      <span className="ml-2 font-medium">
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {booking.checkOut && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                        <span className="text-gray-600">Check-out:</span>
                        <span className="ml-2 font-medium">
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Guests:</span>
                      <span className="ml-2 font-medium">
                        {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Total Price:</span>
                      <span className="ml-2 font-medium text-lg text-green-600">
                        ${booking.totalPrice}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Booked on:</span>
                      <span className="ml-2 font-medium">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-600">Booked at:</span>
                      <span className="ml-2 font-medium">
                        {new Date(booking.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            {booking.specialRequests && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Special Requests</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {booking.specialRequests}
                </p>
              </div>
            )}

            {/* Cancellation Policy */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Cancellation Policy</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pending bookings can be cancelled at any time</li>
                <li>• Confirmed bookings may have cancellation fees</li>
                <li>• Cancelled bookings cannot be reactivated</li>
                <li>• Contact support for any questions</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {booking.status === 'pending' && (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 