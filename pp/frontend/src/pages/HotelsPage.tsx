import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Loader, Search, MapPin, Wifi, Coffee, Utensils, Bath, Dumbbell, Car, CreditCard } from 'lucide-react';
import { DatabaseHotel, databaseService } from '../services/databaseService';
import SearchForm from '../components/SearchForm';
import HotelBookingForm from '../components/HotelBookingForm';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<DatabaseHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<DatabaseHotel | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const hotelsData = await databaseService.getAllHotels();
        // Filter to show only active hotels
        const activeHotels = hotelsData.filter(hotel => hotel.isActive);
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

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map amenities to icons
  const getAmenityIcon = (amenity: string) => {
    const amenityIcons: { [key: string]: JSX.Element } = {
      'WiFi': <Wifi className="h-4 w-4" />,
      'Free WiFi': <Wifi className="h-4 w-4" />,
      'Breakfast': <Coffee className="h-4 w-4" />,
      'Breakfast Included': <Coffee className="h-4 w-4" />,
      'Restaurant': <Utensils className="h-4 w-4" />,
      'Pool': <Bath className="h-4 w-4" />,
      'Swimming Pool': <Bath className="h-4 w-4" />,
      'Gym': <Dumbbell className="h-4 w-4" />,
      'Fitness Center': <Dumbbell className="h-4 w-4" />,
      'Parking': <Car className="h-4 w-4" />,
      'Free Parking': <Car className="h-4 w-4" />
    };
    return amenityIcons[amenity] || <div className="h-4 w-4 bg-gray-300 rounded" />;
  };

  const handleBookNow = (e: React.MouseEvent, hotel: DatabaseHotel) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation();
    setSelectedHotel(hotel);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setSelectedHotel(null);
    // You could add a success notification here
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedHotel(null);
  };

  if (loading) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading hotels...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
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
      <div className="container mx-auto px-4 py-12">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Hotels</h1>
          <p className="text-lg text-gray-600">Discover amazing hotels for your perfect stay</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link to={`/hotels/${hotel.id}`}>
                  <div className="relative h-64">
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {hotel.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hotel.address.city}, {hotel.address.country}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </span>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{hotel.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${hotel.priceRange.min}
                        </span>
                        <span className="text-sm font-normal text-gray-600">/night</span>
                      </div>
                      <span className="text-blue-600 font-semibold group-hover:underline">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <button
                    onClick={(e) => handleBookNow(e, hotel)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hotels found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {showBookingForm && selectedHotel && (
        <HotelBookingForm
          hotel={selectedHotel}
          onClose={handleCloseBookingForm}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}