import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Loader } from 'lucide-react';
import { DatabaseHotel, databaseService } from '../services/databaseService';

export default function Hotels() {
  const [hotels, setHotels] = useState<DatabaseHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const hotelsData = await databaseService.getAllHotels();
        // Filter to show only active hotels and limit to 4 for homepage
        const activeHotels = hotelsData.filter(hotel => hotel.isActive).slice(0, 4);
        setHotels(activeHotels);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError('Failed to load hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Hotels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our selection of handpicked hotels for your perfect stay.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading hotels...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Hotels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our selection of handpicked hotels for your perfect stay.
            </p>
          </div>
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Hotels
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our selection of handpicked hotels for your perfect stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotels.map((hotel) => (
            <Link
              key={hotel.id}
              to={`/hotels/${hotel.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-48">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {hotel.address.city}, {hotel.address.country}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${hotel.priceRange.min}
                      <span className="text-sm font-normal text-gray-600">/night</span>
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:underline">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/hotels"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View All Hotels
          </Link>
        </div>
      </div>
    </section>
  );
}