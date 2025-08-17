import React, { useState } from 'react';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  type: 'hotel' | 'destination';
  itemId: string;
  itemName: string;
  itemPrice: number;
  onBookingComplete: (bookingData: any) => void;
}

export default function BookingForm({ type, itemId, itemName, itemPrice, onBookingComplete }: BookingFormProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalPrice = () => {
    const nights = formData.checkIn && formData.checkOut 
      ? Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    return nights * itemPrice * formData.guests;
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
        [type]: itemId,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        totalPrice: totalPrice,
        specialRequests: formData.specialRequests,
        status: 'pending',
        type: type
      };

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
        throw new Error(errorData.message || 'Failed to create booking');
      }

      const booking = await response.json();
      console.log('Booking created:', booking);

      setSuccess(true);
      onBookingComplete(booking);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          checkIn: '',
          checkOut: '',
          guests: 1,
          specialRequests: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Booking error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Successful!</h3>
        <p className="text-green-600">
          Your {type} booking has been confirmed. You will receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Book {type === 'hotel' ? 'Hotel' : 'Destination'}: {itemName}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Check-in Date
            </label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Check-out Date
            </label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="h-4 w-4 inline mr-2" />
            Number of Guests
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
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
            placeholder="Any special requests or requirements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price per night:</span>
              <span>${itemPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Number of guests:</span>
              <span>{formData.guests}</span>
            </div>
            {formData.checkIn && formData.checkOut && (
              <div className="flex justify-between">
                <span>Number of nights:</span>
                <span>{Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Price:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.checkIn || !formData.checkOut}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
            loading || !formData.checkIn || !formData.checkOut
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing Booking...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Confirm Booking
            </>
          )}
        </button>
      </form>
    </div>
  );
} 