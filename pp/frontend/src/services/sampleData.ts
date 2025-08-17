import { DatabaseHotel, DatabaseDestination } from './databaseService';

export const sampleHotels: Omit<DatabaseHotel, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Grand Plaza Hotel & Spa',
    description: 'Luxurious 5-star hotel in the heart of downtown, featuring world-class amenities, spa services, and stunning city views. Perfect for both business and leisure travelers.',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Room Service', 'Concierge', 'Valet Parking'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630660664869-c9d3cc676880?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    priceRange: {
      min: 299,
      max: 599
    },
    contactInfo: {
      phone: '+1-555-0123',
      email: 'info@grandplaza.com'
    },
    isActive: true
  },
  {
    name: 'Seaside Resort & Marina',
    description: 'Beachfront resort offering direct access to pristine beaches, private marina, and tropical gardens. Ideal for water sports enthusiasts and relaxation seekers.',
    address: {
      street: '456 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33139'
    },
    amenities: ['Free WiFi', 'Private Beach', 'Marina', 'Swimming Pool', 'Water Sports', 'Restaurant', 'Bar', 'Spa'],
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    priceRange: {
      min: 199,
      max: 449
    },
    contactInfo: {
      phone: '+1-555-0456',
      email: 'info@seasideresort.com'
    },
    isActive: true
  },
  {
    name: 'Mountain View Lodge',
    description: 'Cozy mountain lodge nestled in the heart of the Rockies, offering breathtaking views, hiking trails, and rustic luxury. Perfect for nature lovers and adventure seekers.',
    address: {
      street: '789 Mountain Road',
      city: 'Aspen',
      state: 'CO',
      country: 'USA',
      zipCode: '81611'
    },
    amenities: ['Free WiFi', 'Mountain Views', 'Hiking Trails', 'Restaurant', 'Fireplace', 'Ski Storage', 'Shuttle Service'],
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    priceRange: {
      min: 179,
      max: 399
    },
    contactInfo: {
      phone: '+1-555-0789',
      email: 'info@mountainviewlodge.com'
    },
    isActive: true
  },
  {
    name: 'Urban Boutique Hotel',
    description: 'Modern boutique hotel in the trendy district, featuring contemporary design, rooftop bar, and personalized service. Perfect for urban explorers and business travelers.',
    address: {
      street: '321 Fashion Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90210'
    },
    amenities: ['Free WiFi', 'Rooftop Bar', 'Fitness Center', 'Restaurant', 'Concierge', 'Valet Parking', 'Business Center'],
    images: [
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    priceRange: {
      min: 249,
      max: 499
    },
    contactInfo: {
      phone: '+1-555-0321',
      email: 'info@urbanboutique.com'
    },
    isActive: true
  },
  {
    name: 'Historic Grand Hotel',
    description: 'Elegant historic hotel with classic architecture, fine dining, and traditional luxury. Experience the charm of a bygone era with modern comforts.',
    address: {
      street: '654 Heritage Lane',
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      zipCode: '02101'
    },
    amenities: ['Free WiFi', 'Fine Dining', 'Historic Tours', 'Library', 'Afternoon Tea', 'Concierge', 'Valet Parking'],
    images: [
      'https://images.unsplash.com/photo-1630660664869-c9d3cc676880?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    priceRange: {
      min: 399,
      max: 799
    },
    contactInfo: {
      phone: '+1-555-0654',
      email: 'info@historicgrand.com'
    },
    isActive: true
  },
  {
    name: 'Desert Oasis Resort',
    description: 'Luxurious desert resort featuring stunning architecture, infinity pools, and panoramic desert views. Perfect for relaxation and wellness retreats.',
    address: {
      street: '987 Desert Trail',
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA',
      zipCode: '85001'
    },
    amenities: ['Free WiFi', 'Infinity Pools', 'Spa', 'Desert Tours', 'Restaurant', 'Golf Course', 'Tennis Courts'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.4,
    priceRange: {
      min: 159,
      max: 349
    },
    contactInfo: {
      phone: '+1-555-0987',
      email: 'info@desertoasis.com'
    },
    isActive: true
  }
];

export const sampleDestinations: Omit<DatabaseDestination, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Santorini, Greece',
    country: 'Greece',
    city: 'Santorini',
    description: 'Experience the magic of Santorini, with its stunning white-washed buildings, blue-domed churches, and breathtaking sunsets over the Aegean Sea. This volcanic island offers a perfect blend of natural beauty, rich history, and Mediterranean charm.',
    shortDescription: 'Stunning volcanic island with iconic white buildings and sunsets',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    price: 899,
    currency: 'USD',
    climate: 'Mediterranean',
    bestTimeToVisit: 'April to October',
    attractions: [
      {
        name: 'Oia Village',
        description: 'Famous for its stunning sunsets and white-washed buildings',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Fira Town',
        description: 'The capital with shopping, dining, and nightlife',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    activities: ['Island Hopping', 'Wine Tasting', 'Sunset Watching', 'Beach Activities', 'Volcano Tours'],
    isPopular: true,
    isActive: true
  },
  {
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    city: 'Bali',
    description: 'Discover the tropical paradise of Bali, featuring ancient temples, lush rice terraces, pristine beaches, and vibrant cultural experiences. This spiritual island offers a perfect balance of adventure, relaxation, and cultural immersion.',
    shortDescription: 'Tropical paradise with temples, beaches, and rich culture',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    price: 799,
    currency: 'USD',
    climate: 'Tropical',
    bestTimeToVisit: 'May to October',
    attractions: [
      {
        name: 'Ubud Sacred Monkey Forest',
        description: 'Sacred sanctuary with ancient temples and playful monkeys',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Tegallalang Rice Terraces',
        description: 'Stunning terraced rice fields with traditional farming',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    activities: ['Temple Visits', 'Surfing', 'Rice Field Tours', 'Spa Treatments', 'Cultural Workshops'],
    isPopular: true,
    isActive: true
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    city: 'Male',
    description: 'Experience ultimate luxury in the Maldives, with overwater bungalows, crystal-clear turquoise waters, and pristine white sand beaches. Perfect for honeymoons, diving adventures, and tropical relaxation.',
    shortDescription: 'Luxury overwater bungalows in crystal-clear waters',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    price: 1299,
    currency: 'USD',
    climate: 'Tropical',
    bestTimeToVisit: 'November to April',
    attractions: [
      {
        name: 'Overwater Bungalows',
        description: 'Luxury accommodations over crystal-clear waters',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Coral Reefs',
        description: 'World-class diving and snorkeling sites',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    activities: ['Scuba Diving', 'Snorkeling', 'Island Hopping', 'Spa Treatments', 'Water Sports'],
    isPopular: true,
    isActive: true
  },
  {
    name: 'Tokyo, Japan',
    country: 'Japan',
    city: 'Tokyo',
    description: 'Immerse yourself in the fascinating blend of ancient traditions and cutting-edge technology in Tokyo. From serene temples to bustling districts, experience the perfect harmony of old and new Japan.',
    shortDescription: 'Modern metropolis with ancient traditions and cutting-edge technology',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    price: 999,
    currency: 'USD',
    climate: 'Temperate',
    bestTimeToVisit: 'March to May and September to November',
    attractions: [
      {
        name: 'Shibuya Crossing',
        description: 'World\'s busiest pedestrian crossing',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Senso-ji Temple',
        description: 'Tokyo\'s oldest Buddhist temple',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    activities: ['Temple Visits', 'Shopping', 'Food Tours', 'Cherry Blossom Viewing', 'Technology Tours'],
    isPopular: true,
    isActive: true
  },
  {
    name: 'Paris, France',
    country: 'France',
    city: 'Paris',
    description: 'Experience the romance and culture of the City of Light. From iconic landmarks to charming neighborhoods, Paris offers world-class art, cuisine, and unforgettable experiences.',
    shortDescription: 'Romantic city of light with iconic landmarks and world-class cuisine',
    images: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    price: 1099,
    currency: 'USD',
    climate: 'Temperate',
    bestTimeToVisit: 'April to June and September to October',
    attractions: [
      {
        name: 'Eiffel Tower',
        description: 'Iconic symbol of Paris and France',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Louvre Museum',
        description: 'World\'s largest art museum',
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    activities: ['Museum Visits', 'River Cruises', 'Food Tours', 'Shopping', 'Architecture Tours'],
    isPopular: true,
    isActive: true
  },
  {
    name: 'New York City, USA',
    country: 'USA',
    city: 'New York',
    description: 'Experience the energy and diversity of the Big Apple. From iconic landmarks to world-class entertainment, New York City offers endless opportunities for exploration and adventure.',
    shortDescription: 'The city that never sleeps with iconic landmarks and endless entertainment',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    mainImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    price: 899,
    currency: 'USD',
    climate: 'Temperate',
    bestTimeToVisit: 'April to June and September to November',
    attractions: [
      {
        name: 'Times Square',
        description: 'Famous intersection and entertainment hub',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Central Park',
        description: 'Urban oasis with lakes, trails, and attractions',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    activities: ['Broadway Shows', 'Museum Visits', 'Shopping', 'Food Tours', 'Architecture Tours'],
    isPopular: true,
    isActive: true
  }
];

export const populateDatabase = async () => {
  try {
    console.log('Starting database population...');
    
    // Add hotels
    for (const hotel of sampleHotels) {
      try {
        await fetch('http://localhost:5000/api/hotels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(hotel)
        });
        console.log(`Added hotel: ${hotel.name}`);
      } catch (error) {
        console.error(`Failed to add hotel ${hotel.name}:`, error);
      }
    }

    // Add destinations
    for (const destination of sampleDestinations) {
      try {
        await fetch('http://localhost:5000/api/destinations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(destination)
        });
        console.log(`Added destination: ${destination.name}`);
      } catch (error) {
        console.error(`Failed to add destination ${destination.name}:`, error);
      }
    }

    console.log('Database population completed!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

// Make it available globally for console access
if (typeof window !== 'undefined') {
  (window as any).populateDatabase = populateDatabase;
  (window as any).sampleHotels = sampleHotels;
  (window as any).sampleDestinations = sampleDestinations;
  
  console.log('Database utilities available:');
  console.log('- window.populateDatabase() - Populate database with sample data');
  console.log('- window.sampleHotels - View sample hotel data');
  console.log('- window.sampleDestinations - View sample destination data');
}
