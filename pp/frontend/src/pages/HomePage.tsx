import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Calendar, Heart } from 'lucide-react';

export default function HomePage() {
  const featuredDestinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      rating: 4.8,
      reviews: 2341,
      price: 'From $899',
      description: 'Experience paradise with pristine beaches and rich culture'
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      rating: 4.9,
      reviews: 1892,
      price: 'From $1099',
      description: 'Stunning sunsets and white-washed architecture'
    },
    {
      id: 3,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      rating: 4.7,
      reviews: 1567,
      price: 'From $1299',
      description: 'Ancient temples and beautiful cherry blossoms'
    }
  ];

  const specialOffers = [
    {
      id: 1,
      title: 'Summer Getaway',
      description: 'Book now and get 20% off on selected destinations',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      validUntil: 'August 31, 2024'
    },
    {
      id: 2,
      title: 'Family Package',
      description: 'Special rates for family bookings with free activities',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
      validUntil: 'December 31, 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Explore breathtaking destinations and create unforgettable memories
            </p>
            <Link
              to="/destinations"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                    aria-label="Add to favorites"
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold">{destination.price}</span>
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialOffers.map((offer) => (
              <div
                key={offer.id}
                className="relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="mb-4">{offer.description}</p>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Valid until {offer.validUntil}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Travel Deals
          </h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter and be the first to know about exclusive offers
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We offer competitive prices and price matching for your peace of mind
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Local Guides</h3>
              <p className="text-gray-600">
                Discover hidden gems with our experienced local guides
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always here to help you
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 