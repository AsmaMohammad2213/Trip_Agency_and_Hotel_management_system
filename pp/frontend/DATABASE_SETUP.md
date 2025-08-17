# Database Setup Guide

This guide explains how to populate the database with sample hotels and destinations for testing and development.

## Sample Data Included

### Hotels (6 total)
1. **Grand Plaza Hotel & Spa** - New York, USA
   - Luxury 5-star hotel with spa services
   - Price: $299-599/night
   - Amenities: WiFi, Pool, Spa, Restaurant, Fitness Center, Room Service

2. **Seaside Resort & Marina** - Miami, USA
   - Beachfront resort with private marina
   - Price: $199-449/night
   - Amenities: Private Beach, Marina, Swimming Pool, Water Sports

3. **Mountain View Lodge** - Aspen, USA
   - Cozy mountain lodge in the Rockies
   - Price: $179-399/night
   - Amenities: Mountain Views, Hiking Trails, Fireplace, Ski Storage

4. **Urban Boutique Hotel** - Los Angeles, USA
   - Modern boutique hotel with rooftop bar
   - Price: $249-499/night
   - Amenities: Rooftop Bar, Fitness Center, Business Center

5. **Historic Grand Hotel** - Boston, USA
   - Elegant historic hotel with classic architecture
   - Price: $399-799/night
   - Amenities: Fine Dining, Historic Tours, Library, Afternoon Tea

6. **Desert Oasis Resort** - Phoenix, USA
   - Luxury desert resort with infinity pools
   - Price: $159-349/night
   - Amenities: Infinity Pools, Spa, Desert Tours, Golf Course

### Destinations (7 total)
1. **Santorini, Greece** - $899/person
   - Stunning volcanic island with iconic white buildings
   - Activities: Island Hopping, Wine Tasting, Sunset Watching

2. **Bali, Indonesia** - $799/person
   - Tropical paradise with temples and beaches
   - Activities: Temple Visits, Surfing, Rice Field Tours

3. **Maldives** - $1299/person
   - Luxury overwater bungalows in crystal-clear waters
   - Activities: Scuba Diving, Snorkeling, Island Hopping

4. **Tokyo, Japan** - $999/person
   - Modern metropolis with ancient traditions
   - Activities: Temple Visits, Shopping, Food Tours

5. **Paris, France** - $1099/person
   - Romantic city of light with iconic landmarks
   - Activities: Museum Visits, River Cruises, Food Tours

6. **New York City, USA** - $899/person
   - The city that never sleeps with endless entertainment
   - Activities: Broadway Shows, Museum Visits, Shopping

## How to Populate the Database

### Method 1: Admin Dashboard (Recommended)
1. Log in as an admin user
2. Go to the Admin Dashboard
3. If the database is empty, you'll see a "Quick Setup" section
4. Click "Add Sample Data" button
5. Wait for the confirmation message

### Method 2: Direct URL
1. Log in as an admin user
2. Navigate to `/admin/populate-database`
3. Click "Add Sample Data" button
4. Wait for the confirmation message

### Method 3: Browser Console (For Developers)
1. Log in as an admin user
2. Open browser developer tools (F12)
3. Go to the Console tab
4. Run: `window.populateDatabase()`
5. Check the console for progress messages

### Method 4: Programmatic Access
```javascript
import { populateDatabase } from './services/sampleData';

// Make sure you're logged in as admin first
await populateDatabase();
```

## Requirements

- **Authentication**: Must be logged in as an admin user
- **Backend Server**: The backend server must be running on `http://localhost:5000`
- **API Endpoints**: The following endpoints must be available:
  - `POST /api/hotels` - For adding hotels
  - `POST /api/destinations` - For adding destinations

## Data Structure

### Hotel Data Structure
```typescript
{
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  amenities: string[];
  images: string[];
  rating: number;
  priceRange: {
    min: number;
    max: number;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  isActive: boolean;
}
```

### Destination Data Structure
```typescript
{
  name: string;
  country: string;
  city: string;
  description: string;
  shortDescription: string;
  images: string[];
  mainImage: string;
  rating: number;
  price: number;
  currency: string;
  climate: string;
  bestTimeToVisit: string;
  attractions: Array<{
    name: string;
    description: string;
    image: string;
  }>;
  activities: string[];
  isPopular: boolean;
  isActive: boolean;
}
```

## Troubleshooting

### Common Issues

1. **"Failed to populate database" error**
   - Make sure you're logged in as an admin user
   - Check that the backend server is running
   - Verify the API endpoints are working

2. **"Authorization" error**
   - Log out and log back in as an admin
   - Check that your token is valid
   - Clear browser storage and re-authenticate

3. **"Network error"**
   - Ensure the backend server is running on port 5000
   - Check your network connection
   - Verify CORS settings on the backend

### Verification

After populating the database, you can verify the data was added by:

1. Checking the Admin Dashboard stats
2. Browsing to `/hotels` or `/destinations`
3. Viewing individual hotel/destination pages
4. Checking the backend database directly

## Customization

To add your own sample data:

1. Edit the `sampleHotels` and `sampleDestinations` arrays in `src/services/sampleData.ts`
2. Follow the same data structure as the existing samples
3. Use high-quality images from Unsplash or similar services
4. Ensure all required fields are populated
5. Test the data by running the populate function

## Notes

- All sample data uses realistic pricing and descriptions
- Images are sourced from Unsplash for high quality
- Data is designed to showcase the booking system features
- All hotels and destinations are marked as active by default
- Popular destinations are flagged for homepage display 