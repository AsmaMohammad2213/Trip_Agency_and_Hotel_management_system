import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Utensils, Bath, Dumbbell, Car, Calendar, Users, Loader } from 'lucide-react';
import HotelBookingForm from '../components/HotelBookingForm';
import { DatabaseHotel, databaseService } from '../services/databaseService';

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<DatabaseHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const hotelData = await databaseService.getHotelById(id);
        setHotel(hotelData);
      } catch (err) {
        console.error('Error fetching hotel:', err);
        setError('Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading hotel...</span>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="pt-20 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The hotel you are looking for does not exist.'}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBookingSuccess = () => {
    // You can add additional logic here, like showing a success message
    // or redirecting to a booking confirmation page
    console.log('Hotel booking completed successfully');
  };

  // Map amenities to icons
  const getAmenityIcon = (amenity: string) => {
    const amenityIcons: { [key: string]: JSX.Element } = {
      'WiFi': <Wifi className="h-5 w-5" />,
      'Free WiFi': <Wifi className="h-5 w-5" />,
      'Breakfast': <Coffee className="h-5 w-5" />,
      'Breakfast Included': <Coffee className="h-5 w-5" />,
      'Restaurant': <Utensils className="h-5 w-5" />,
      'Pool': <Bath className="h-5 w-5" />,
      'Swimming Pool': <Bath className="h-5 w-5" />,
      'Gym': <Dumbbell className="h-5 w-5" />,
      'Fitness Center': <Dumbbell className="h-5 w-5" />,
      'Parking': <Car className="h-5 w-5" />,
      'Free Parking': <Car className="h-5 w-5" />
    };
    return amenityIcons[amenity] || <div className="h-5 w-5 bg-gray-300 rounded" />;
  };

  return (
    <div className="pt-20">
      <div className="relative h-96">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">{hotel.name}</h1>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5" />
              <span className="text-xl">{hotel.address.city}, {hotel.address.country}</span>
              <div className="flex items-center">
                {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm">({hotel.rating})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About the Hotel</h2>
              <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
            </div>

            {hotel.images && hotel.images.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-4">
                  {hotel.images.slice(1, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-600">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Phone:</strong> {hotel.contactInfo.phone}</p>
                <p><strong>Email:</strong> {hotel.contactInfo.email}</p>
                <p><strong>Address:</strong> {hotel.address.street}, {hotel.address.city}, {hotel.address.state} {hotel.address.zipCode}, {hotel.address.country}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-2xl font-bold mb-6">Book Your Stay</h3>
              
              <div className="mb-6">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-blue-600">${hotel.priceRange.min} - ${hotel.priceRange.max}</p>
                  <p className="text-gray-600">per night</p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{hotel.rating}/5 rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{hotel.address.city}, {hotel.address.country}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && hotel && (
        <HotelBookingForm
          hotel={{
            id: hotel.id,
            name: hotel.name,
            location: `${hotel.address.city}, ${hotel.address.country}`,
            rating: hotel.rating,
            price: hotel.priceRange.min, // Use minimum price as base
            image: hotel.images[0],
            description: hotel.description,
            amenities: hotel.amenities
          }}
          onClose={() => setShowBookingForm(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}