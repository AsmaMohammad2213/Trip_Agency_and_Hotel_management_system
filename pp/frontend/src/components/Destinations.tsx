import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { DatabaseDestination, databaseService } from '../services/databaseService';

export default function Destinations() {
  const [destinations, setDestinations] = useState<DatabaseDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const destinationsData = await databaseService.getAllDestinations();
        // Filter to show only popular destinations for the homepage
        const popularDestinations = destinationsData.filter(dest => dest.isPopular).slice(0, 3);
        setDestinations(popularDestinations);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading destinations...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={destination.mainImage || destination.images[0]}
                alt={destination.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{destination.city}, {destination.country}</p>
                <p className="text-gray-600 text-sm mb-3">{destination.shortDescription}</p>
                <p className="text-gray-600">Starting from</p>
                <p className="text-2xl font-bold text-blue-600">${destination.price}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}