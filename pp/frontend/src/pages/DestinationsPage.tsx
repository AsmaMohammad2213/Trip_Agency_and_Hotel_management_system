import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Loader, Search, MapPin, CreditCard } from 'lucide-react';
import { DatabaseDestination, databaseService } from '../services/databaseService';
import DestinationBookingForm from '../components/DestinationBookingForm';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DatabaseDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<DatabaseDestination | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const destinationsData = await databaseService.getAllDestinations();
        // Filter to show only active destinations
        const activeDestinations = destinationsData.filter(dest => dest.isActive);
        setDestinations(activeDestinations);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookNow = (e: React.MouseEvent, destination: DatabaseDestination) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation();
    setSelectedDestination(destination);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setSelectedDestination(null);
    // You could add a success notification here
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedDestination(null);
  };

  if (loading) {
    return (
      <div className="pt-20">
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
            <p className="text-xl">Discover amazing places around the world</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading destinations...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <div className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
            <p className="text-xl">Discover amazing places around the world</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl">Discover amazing places around the world</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link to={`/destinations/${destination.id}`}>
                <div className="relative h-64">
                  <img
                    src={destination.mainImage || destination.images[0]}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{destination.rating}</span>
                  </div>
                  {destination.isPopular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.city}, {destination.country}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">{destination.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Starting from</p>
                      <p className="text-2xl font-bold text-blue-600">${destination.price}</p>
                    </div>
                    <span className="text-blue-600 font-semibold hover:underline">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
              <div className="px-6 pb-6">
                <button
                  onClick={(e) => handleBookNow(e, destination)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No destinations found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {showBookingForm && selectedDestination && (
        <DestinationBookingForm
          destination={selectedDestination}
          onClose={handleCloseBookingForm}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}