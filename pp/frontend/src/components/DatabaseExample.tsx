import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Save, X } from 'lucide-react';

// Example component showing how to interact with the database
export default function DatabaseExample() {
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [hotelForm, setHotelForm] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    amenities: [],
    rating: 0,
    priceRange: {
      min: 0,
      max: 0
    },
    contactInfo: {
      phone: '',
      email: ''
    }
  });

  const [destinationForm, setDestinationForm] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    shortDescription: '',
    mainImage: '',
    rating: 0,
    price: 0,
    climate: 'temperate',
    bestTimeToVisit: '',
    activities: [],
    isPopular: false
  });

  // Load data from database
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load hotels
      const hotelsResponse = await fetch('http://localhost:5000/api/hotels');
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);

      // Load destinations
      const destinationsResponse = await fetch('http://localhost:5000/api/destinations');
      const destinationsData = await destinationsResponse.json();
      setDestinations(destinationsData);

    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to mock data if backend is not available
      setHotels([
        {
          id: '1',
          name: 'Grand Hotel',
          description: 'Luxury hotel in city center',
          address: { city: 'New York', country: 'USA' },
          rating: 4.5,
          priceRange: { min: 200, max: 500 }
        }
      ]);
      setDestinations([
        {
          id: '1',
          name: 'Paris',
          country: 'France',
          city: 'Paris',
          description: 'The City of Light',
          rating: 4.8,
          price: 1200
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Create new hotel
  const createHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(hotelForm)
      });

      if (response.ok) {
        const newHotel = await response.json();
        setHotels([...hotels, newHotel]);
        setShowAddHotel(false);
        setHotelForm({
          name: '',
          description: '',
          address: { street: '', city: '', state: '', country: '', zipCode: '' },
          amenities: [],
          rating: 0,
          priceRange: { min: 0, max: 0 },
          contactInfo: { phone: '', email: '' }
        });
        alert('Hotel created successfully!');
      } else {
        alert('Failed to create hotel');
      }
    } catch (error) {
      console.error('Error creating hotel:', error);
      alert('Error creating hotel');
    }
  };

  // Create new destination
  const createDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(destinationForm)
      });

      if (response.ok) {
        const newDestination = await response.json();
        setDestinations([...destinations, newDestination]);
        setShowAddDestination(false);
        setDestinationForm({
          name: '',
          country: '',
          city: '',
          description: '',
          shortDescription: '',
          mainImage: '',
          rating: 0,
          price: 0,
          climate: 'temperate',
          bestTimeToVisit: '',
          activities: [],
          isPopular: false
        });
        alert('Destination created successfully!');
      } else {
        alert('Failed to create destination');
      }
    } catch (error) {
      console.error('Error creating destination:', error);
      alert('Error creating destination');
    }
  };

  // Delete hotel
  const deleteHotel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setHotels(hotels.filter(hotel => hotel.id !== id));
        alert('Hotel deleted successfully!');
      } else {
        alert('Failed to delete hotel');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      alert('Error deleting hotel');
    }
  };

  // Delete destination
  const deleteDestination = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setDestinations(destinations.filter(dest => dest.id !== id));
        alert('Destination deleted successfully!');
      } else {
        alert('Failed to delete destination');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      alert('Error deleting destination');
    }
  };

  // Filter data based on search term
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Database Operations Example
        </h1>
        <p className="text-gray-600">
          This component demonstrates how to store and retrieve data from the MongoDB database.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search hotels and destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Hotels Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Hotels</h2>
          <button
            onClick={() => setShowAddHotel(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hotel
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{hotel.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{hotel.description}</p>
              <p className="text-gray-500 text-sm mb-2">
                {hotel.address.city}, {hotel.address.country}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-500">★ {hotel.rating}</span>
                <span className="text-green-600 font-semibold">
                  ${hotel.priceRange.min} - ${hotel.priceRange.max}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteHotel(hotel.id)}
                  className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4 inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Destinations</h2>
          <button
            onClick={() => setShowAddDestination(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Destination
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{destination.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{destination.description}</p>
              <p className="text-gray-500 text-sm mb-2">
                {destination.city}, {destination.country}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-500">★ {destination.rating}</span>
                <span className="text-green-600 font-semibold">
                  ${destination.price}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteDestination(destination.id)}
                  className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4 inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Hotel Modal */}
      {showAddHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Hotel</h3>
              <button
                onClick={() => setShowAddHotel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={createHotel}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={hotelForm.name}
                  onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={hotelForm.description}
                  onChange={(e) => setHotelForm({...hotelForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={hotelForm.address.city}
                  onChange={(e) => setHotelForm({
                    ...hotelForm, 
                    address: {...hotelForm.address, city: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={hotelForm.address.country}
                  onChange={(e) => setHotelForm({
                    ...hotelForm, 
                    address: {...hotelForm.address, country: e.target.value}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={hotelForm.priceRange.min}
                    onChange={(e) => setHotelForm({
                      ...hotelForm, 
                      priceRange: {...hotelForm.priceRange, min: parseInt(e.target.value)}
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={hotelForm.priceRange.max}
                    onChange={(e) => setHotelForm({
                      ...hotelForm, 
                      priceRange: {...hotelForm.priceRange, max: parseInt(e.target.value)}
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 inline mr-2" />
                    Save Hotel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddHotel(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {showAddDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Destination</h3>
              <button
                onClick={() => setShowAddDestination(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={createDestination}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Destination Name"
                  value={destinationForm.name}
                  onChange={(e) => setDestinationForm({...destinationForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={destinationForm.country}
                  onChange={(e) => setDestinationForm({...destinationForm, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={destinationForm.city}
                  onChange={(e) => setDestinationForm({...destinationForm, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={destinationForm.description}
                  onChange={(e) => setDestinationForm({...destinationForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={destinationForm.price}
                  onChange={(e) => setDestinationForm({...destinationForm, price: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 inline mr-2" />
                    Save Destination
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDestination(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 