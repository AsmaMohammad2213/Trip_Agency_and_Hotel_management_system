import React, { useState } from 'react';
import { Calendar, Users, CreditCard, MapPin, Star, Globe } from 'lucide-react';
import { DatabaseDestination } from '../services/databaseService';

interface DestinationBookingFormProps {
  destination: DatabaseDestination;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export default function DestinationBookingForm({ destination, onClose, onBookingSuccess }: DestinationBookingFormProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    guests: 1,
    packageType: 'basic',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalPrice = () => {
    const basePrice = destination.price;
    const guestMultiplier = formData.guests;
    const packageMultiplier = formData.packageType === 'premium' ? 1.5 : 
                              formData.packageType === 'luxury' ? 2.0 : 1.0;
    
    return Math.round(basePrice * guestMultiplier * packageMultiplier);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to make a booking');
        return;
      }

      const totalPrice = calculateTotalPrice();
      
      const bookingData = {
        destination: destination.id,
        checkIn: formData.checkIn,
        guests: formData.guests,
        totalPrice: totalPrice,
        packageType: formData.packageType,
        specialRequests: formData.specialRequests,
        status: 'pending',
        bookingType: 'destination'
      };

      console.log('Sending booking data:', bookingData);
      console.log('Destination ID:', destination.id);
      console.log('Destination object:', destination);
      
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Booking error response:', errorData);
        throw new Error(errorData.message || 'Failed to create booking');
      }

      const booking = await response.json();
      console.log('Destination booking created:', booking);
      
      onBookingSuccess();
      onClose();
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book Destination</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Destination Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <img
                src={destination.mainImage || destination.images[0]}
                alt={destination.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.city}, {destination.country}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{destination.rating}/5</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Climate: {destination.climate}
                </p>
                <p className="text-lg font-semibold text-blue-600 mt-2">
                  ${destination.price}/person
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={today}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Type
                </label>
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requests or preferences..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Package Details */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Package Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base price per person:</span>
                  <span>${destination.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of guests:</span>
                  <span>{formData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Package type:</span>
                  <span className="capitalize">{formData.packageType}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Available Activities</h4>
              <div className="grid grid-cols-1 gap-1 text-sm">
                {destination.activities.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <Globe className="h-3 w-3 text-green-600 mr-2" />
                    <span>{activity}</span>
                  </div>
                ))}
                {destination.activities.length > 5 && (
                  <div className="text-gray-500 text-xs mt-1">
                    +{destination.activities.length - 5} more activities
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.checkIn}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Book Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
