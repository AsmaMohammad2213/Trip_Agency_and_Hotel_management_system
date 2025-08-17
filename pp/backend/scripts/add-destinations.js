const mongoose = require('mongoose');
const Destination = require('../src/models/destination.model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelease', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const destinations = [
  {
    name: "Bali Paradise",
    country: "Indonesia",
    city: "Bali",
    description: "Discover the enchanting island of Bali, known for its stunning beaches, lush rice terraces, and spiritual temples. Experience the perfect blend of culture, adventure, and relaxation in this tropical paradise.",
    shortDescription: "Tropical paradise with beaches, temples, and culture",
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
    rating: 4.8,
    price: 1200,
    currency: "USD",
    climate: "tropical",
    bestTimeToVisit: "April to October",
    attractions: [
      {
        name: "Ubud Sacred Monkey Forest",
        description: "Sacred sanctuary with ancient temples and playful macaques",
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600"
      },
      {
        name: "Tanah Lot Temple",
        description: "Iconic sea temple perched on a rocky outcrop",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600"
      }
    ],
    activities: ["Surfing", "Yoga", "Temple visits", "Rice terrace trekking", "Beach relaxation", "Cultural tours"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: -8.3405,
      longitude: 115.0920
    }
  },
  {
    name: "Santorini Dreams",
    country: "Greece",
    city: "Santorini",
    description: "Experience the magic of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This volcanic island offers breathtaking views and unforgettable memories.",
    shortDescription: "Iconic Greek island with stunning sunsets and white architecture",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    rating: 4.9,
    price: 1800,
    currency: "USD",
    climate: "mediterranean",
    bestTimeToVisit: "June to September",
    attractions: [
      {
        name: "Oia Village",
        description: "Famous village known for its stunning sunsets and blue-domed churches",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600"
      },
      {
        name: "Red Beach",
        description: "Unique red sand beach with dramatic volcanic cliffs",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600"
      }
    ],
    activities: ["Sunset watching", "Wine tasting", "Beach hopping", "Volcano tours", "Photography", "Sailing"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: 36.3932,
      longitude: 25.4615
    }
  },
  {
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    city: "Zermatt",
    description: "Embark on an alpine adventure in the heart of the Swiss Alps. Experience world-class skiing, breathtaking mountain views, and charming Swiss villages surrounded by snow-capped peaks.",
    shortDescription: "Alpine paradise with skiing and mountain adventures",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.7,
    price: 2200,
    currency: "USD",
    climate: "cold",
    bestTimeToVisit: "December to March (skiing), June to September (hiking)",
    attractions: [
      {
        name: "Matterhorn",
        description: "Iconic pyramid-shaped peak and symbol of the Swiss Alps",
        image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=600"
      },
      {
        name: "Gornergrat",
        description: "Mountain viewpoint offering panoramic views of the Alps",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
      }
    ],
    activities: ["Skiing", "Snowboarding", "Mountain hiking", "Cable car rides", "Alpine photography", "Swiss cuisine"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: 46.0207,
      longitude: 7.7491
    }
  },
  {
    name: "Tokyo Metropolis",
    country: "Japan",
    city: "Tokyo",
    description: "Immerse yourself in the vibrant energy of Tokyo, where ancient traditions meet cutting-edge technology. From serene temples to bustling districts, experience the perfect blend of old and new Japan.",
    shortDescription: "Modern metropolis blending tradition and technology",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    rating: 4.6,
    price: 1600,
    currency: "USD",
    climate: "temperate",
    bestTimeToVisit: "March to May (cherry blossoms), September to November (autumn colors)",
    attractions: [
      {
        name: "Shibuya Crossing",
        description: "World's busiest pedestrian crossing and symbol of Tokyo",
        image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600"
      },
      {
        name: "Senso-ji Temple",
        description: "Tokyo's oldest temple with traditional architecture",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600"
      }
    ],
    activities: ["Sushi making", "Temple visits", "Shopping in Ginza", "Cherry blossom viewing", "Robot restaurant", "Traditional tea ceremony"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: 35.6762,
      longitude: 139.6503
    }
  },
  {
    name: "Machu Picchu Mystery",
    country: "Peru",
    city: "Cusco",
    description: "Journey to the ancient Incan citadel of Machu Picchu, one of the world's most mysterious and awe-inspiring archaeological sites. Discover the secrets of the lost city in the clouds.",
    shortDescription: "Ancient Incan citadel in the Peruvian mountains",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
    rating: 4.9,
    price: 1400,
    currency: "USD",
    climate: "temperate",
    bestTimeToVisit: "April to October (dry season)",
    attractions: [
      {
        name: "Machu Picchu Citadel",
        description: "Ancient Incan ruins perched high in the Andes mountains",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600"
      },
      {
        name: "Sacred Valley",
        description: "Beautiful valley with Incan ruins and traditional villages",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600"
      }
    ],
    activities: ["Inca Trail hiking", "Archaeological tours", "Mountain photography", "Traditional markets", "Andean culture", "Sunrise at Machu Picchu"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: -13.1631,
      longitude: -72.5450
    }
  },
  {
    name: "Dubai Luxury",
    country: "UAE",
    city: "Dubai",
    description: "Experience the ultimate luxury in Dubai, where modern architecture meets Arabian hospitality. From the world's tallest building to pristine beaches, discover opulence in the desert.",
    shortDescription: "Luxury destination with modern architecture and desert adventures",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    rating: 4.5,
    price: 2000,
    currency: "USD",
    climate: "desert",
    bestTimeToVisit: "November to March (pleasant weather)",
    attractions: [
      {
        name: "Burj Khalifa",
        description: "World's tallest building with observation deck",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
      },
      {
        name: "Palm Jumeirah",
        description: "Iconic palm-shaped artificial island",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600"
      }
    ],
    activities: ["Desert safari", "Shopping in malls", "Luxury dining", "Beach relaxation", "Helicopter tours", "Spa treatments"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: 25.2048,
      longitude: 55.2708
    }
  },
  {
    name: "Iceland Northern Lights",
    country: "Iceland",
    city: "Reykjavik",
    description: "Witness the magical Northern Lights dance across the Icelandic sky. Explore geysers, waterfalls, and volcanic landscapes in this land of fire and ice.",
    shortDescription: "Land of fire and ice with Northern Lights and geothermal wonders",
    images: [
      "https://images.unsplash.com/photo-1539066834-3c0b0c0c0c0c?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1539066834-3c0b0c0c0c0c?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1539066834-3c0b0c0c0c0c?w=800",
    rating: 4.8,
    price: 1900,
    currency: "USD",
    climate: "cold",
    bestTimeToVisit: "September to March (Northern Lights), June to August (midnight sun)",
    attractions: [
      {
        name: "Northern Lights",
        description: "Aurora Borealis dancing in the night sky",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
      },
      {
        name: "Blue Lagoon",
        description: "Famous geothermal spa with milky blue waters",
        image: "https://images.unsplash.com/photo-1539066834-3c0b0c0c0c0c?w=600"
      }
    ],
    activities: ["Northern Lights hunting", "Geothermal spa", "Glacier hiking", "Waterfall tours", "Volcano exploration", "Whale watching"],
    isPopular: true,
    isActive: true,
    coordinates: {
      latitude: 64.1466,
      longitude: -21.9426
    }
  },
  {
    name: "Costa Rica Nature",
    country: "Costa Rica",
    city: "Monteverde",
    description: "Explore the rich biodiversity of Costa Rica's rainforests and cloud forests. Experience eco-tourism at its finest with zip-lining, wildlife watching, and sustainable adventures.",
    shortDescription: "Biodiversity hotspot with rainforests and eco-adventures",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1539066834-3c0b0c0c0c0c?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.4,
    price: 1100,
    currency: "USD",
    climate: "tropical",
    bestTimeToVisit: "December to April (dry season)",
    attractions: [
      {
        name: "Monteverde Cloud Forest",
        description: "Mystical cloud forest with diverse wildlife",
        image: "https://images.unsplash.com/photo-1539066834-3c0b0c0c0c0c?w=600"
      },
      {
        name: "Arenal Volcano",
        description: "Active volcano with hot springs",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
      }
    ],
    activities: ["Zip-lining", "Wildlife watching", "Rainforest hiking", "Coffee tours", "Beach relaxation", "Eco-tours"],
    isPopular: false,
    isActive: true,
    coordinates: {
      latitude: 10.3157,
      longitude: -84.8254
    }
  }
];

async function addDestinations() {
  try {
    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Add new destinations
    const result = await Destination.insertMany(destinations);
    console.log(`Successfully added ${result.length} destinations:`);
    
    result.forEach(dest => {
      console.log(`- ${dest.name} (${dest.city}, ${dest.country})`);
    });

    console.log('\nDestinations added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding destinations:', error);
    process.exit(1);
  }
}

addDestinations(); 