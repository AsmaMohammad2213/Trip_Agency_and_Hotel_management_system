import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, MapPin, Globe, Sun, Cloud, Loader } from 'lucide-react';
import DestinationBookingForm from '../components/DestinationBookingForm';
import { DatabaseDestination, databaseService } from '../services/databaseService';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<DatabaseDestination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const destinationData = await databaseService.getDestinationById(id);
        setDestination(destinationData);
      } catch (err) {
        console.error('Error fetching destination:', err);
        setError('Failed to load destination details');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading destination...</span>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="pt-20 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The destination you are looking for does not exist.'}</p>
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
    console.log('Destination booking completed successfully');
  };

  return (
    <div className="pt-20">
      <div className="relative h-96">
        <img
          src={destination.mainImage || destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5" />
              <span className="text-xl">{destination.city}, {destination.country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About the Destination</h2>
              <p className="text-gray-600 leading-relaxed">{destination.description}</p>
            </div>

            {destination.attractions && destination.attractions.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Attractions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.attractions.map((attraction, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-2">{attraction.name}</h4>
                        <p className="text-gray-600 text-sm">{attraction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.activities && destination.activities.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Activities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-600">
                      <Sun className="h-5 w-5 text-blue-600" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.images && destination.images.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-4">
                  {destination.images.slice(1, 4).map((image, index) => (
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
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-blue-600">${destination.price}</p>
                <p className="text-gray-600">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Best Time: {destination.bestTimeToVisit}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  <span>Climate: {destination.climate}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Rating: {destination.rating}/5</span>
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

      {showBookingForm && destination && (
        <DestinationBookingForm
          destination={{
            id: destination.id,
            name: destination.name,
            location: `${destination.city}, ${destination.country}`,
            rating: destination.rating,
            price: destination.price,
            image: destination.mainImage || destination.images[0],
            description: destination.description,
            duration: '7 days', // Default duration, could be made configurable
            activities: destination.activities || [],
            included: ['Hotel Accommodation', 'Breakfast', 'Airport Transfer', 'Local Guide'] // Default inclusions
          }}
          onClose={() => setShowBookingForm(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}