# Database Storage Examples

## How to Store Data in Your Travel Agency Database

### 1. Setting Up the Database Connection

First, make sure your backend is running and MongoDB is connected:

```bash
# Start the backend server
cd pp/backend
npm run dev

# The server will connect to MongoDB using the MONGODB_URI from your .env file
```

### 2. Creating a .env File

Create a `.env` file in `pp/backend/`:

```env
MONGODB_URI=mongodb://localhost:27017/travel-agency
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 3. Frontend Database Operations

#### Creating a New Hotel

```typescript
// In your React component
const createHotel = async () => {
  const hotelData = {
    name: 'Grand Hotel',
    description: 'Luxury hotel in city center',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    amenities: ['WiFi', 'Pool', 'Spa'],
    images: ['image1.jpg', 'image2.jpg'],
    rating: 4.5,
    priceRange: {
      min: 200,
      max: 500
    },
    contactInfo: {
      phone: '+1-555-0123',
      email: 'info@grandhotel.com'
    }
  };

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(hotelData)
    });

    if (response.ok) {
      const newHotel = await response.json();
      console.log('Hotel created:', newHotel);
      // Update your UI state here
    } else {
      console.error('Failed to create hotel');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Creating a New Destination

```typescript
const createDestination = async () => {
  const destinationData = {
    name: 'Paris',
    country: 'France',
    city: 'Paris',
    description: 'The City of Light',
    shortDescription: 'Romantic capital of France',
    mainImage: 'paris-main.jpg',
    images: ['paris1.jpg', 'paris2.jpg'],
    rating: 4.8,
    price: 1200,
    currency: 'USD',
    climate: 'temperate',
    bestTimeToVisit: 'Spring and Fall',
    attractions: [
      {
        name: 'Eiffel Tower',
        description: 'Iconic iron lattice tower',
        image: 'eiffel.jpg'
      }
    ],
    activities: ['Sightseeing', 'Shopping', 'Dining'],
    isPopular: true
  };

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(destinationData)
    });

    if (response.ok) {
      const newDestination = await response.json();
      console.log('Destination created:', newDestination);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Creating a New Booking

```typescript
const createBooking = async () => {
  const bookingData = {
    userId: 'user-id-here',
    hotelId: 'hotel-id-here',
    roomId: 'room-id-here',
    checkIn: '2024-06-15',
    checkOut: '2024-06-18',
    guests: 2,
    totalPrice: 600,
    status: 'pending',
    specialRequests: 'Late check-in requested'
  };

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      const newBooking = await response.json();
      console.log('Booking created:', newBooking);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 4. Reading Data from Database

#### Get All Hotels

```typescript
const getHotels = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/hotels');
    if (response.ok) {
      const hotels = await response.json();
      console.log('Hotels:', hotels);
      return hotels;
    }
  } catch (error) {
    console.error('Error fetching hotels:', error);
  }
};
```

#### Get All Destinations

```typescript
const getDestinations = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/destinations');
    if (response.ok) {
      const destinations = await response.json();
      console.log('Destinations:', destinations);
      return destinations;
    }
  } catch (error) {
    console.error('Error fetching destinations:', error);
  }
};
```

#### Get User Bookings

```typescript
const getUserBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const bookings = await response.json();
      console.log('User bookings:', bookings);
      return bookings;
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};
```

### 5. Updating Data

#### Update Hotel

```typescript
const updateHotel = async (hotelId: string, updateData: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    if (response.ok) {
      const updatedHotel = await response.json();
      console.log('Hotel updated:', updatedHotel);
    }
  } catch (error) {
    console.error('Error updating hotel:', error);
  }
};
```

#### Update Booking Status

```typescript
const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      const updatedBooking = await response.json();
      console.log('Booking status updated:', updatedBooking);
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
  }
};
```

### 6. Deleting Data

#### Delete Hotel (Soft Delete)

```typescript
const deleteHotel = async (hotelId: string) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      console.log('Hotel deleted successfully');
      // Update your UI state here
    }
  } catch (error) {
    console.error('Error deleting hotel:', error);
  }
};
```

### 7. Search and Filter

#### Search Hotels

```typescript
const searchHotels = async (searchTerm: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/hotels?search=${searchTerm}`);
    if (response.ok) {
      const hotels = await response.json();
      console.log('Search results:', hotels);
      return hotels;
    }
  } catch (error) {
    console.error('Error searching hotels:', error);
  }
};
```

### 8. Complete React Component Example

```typescript
import React, { useState, useEffect } from 'react';

interface Hotel {
  id: string;
  name: string;
  description: string;
  address: {
    city: string;
    country: string;
  };
  rating: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export default function HotelManager() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  // Load hotels on component mount
  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/hotels');
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      }
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const addHotel = async (hotelData: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(hotelData)
      });

      if (response.ok) {
        const newHotel = await response.json();
        setHotels([...hotels, newHotel]);
        return newHotel;
      }
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  if (loading) {
    return <div>Loading hotels...</div>;
  }

  return (
    <div>
      <h1>Hotel Manager</h1>
      <div>
        {hotels.map(hotel => (
          <div key={hotel.id}>
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
            <p>{hotel.address.city}, {hotel.address.country}</p>
            <p>Rating: {hotel.rating} | Price: ${hotel.priceRange.min}-${hotel.priceRange.max}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 9. Testing Your Database

1. **Start MongoDB**: Make sure MongoDB is running
2. **Start Backend**: `cd pp/backend && npm run dev`
3. **Test API**: Use tools like Postman or curl to test endpoints
4. **Check Database**: Use MongoDB Compass or mongo shell to view data

### 10. Common Issues and Solutions

- **Connection Error**: Check if MongoDB is running and MONGODB_URI is correct
- **Authentication Error**: Make sure you're logged in and have the correct token
- **Validation Error**: Check that all required fields are provided
- **CORS Error**: Backend should have CORS enabled (already configured)

This setup gives you a complete database storage system for your travel agency application! 