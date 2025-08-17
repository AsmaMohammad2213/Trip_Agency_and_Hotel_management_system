# Travel Agency Backend - Database Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the backend root directory:

```env
MONGODB_URI=mongodb://localhost:27017/travel-agency
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Use your cloud connection string

### 4. Seed the Database
```bash
node src/scripts/seedDatabase.js
```

### 5. Start the Server
```bash
npm run dev
```

## Database Models

### User Model
- Stores user accounts (customers and admins)
- Includes email, password (hashed), name, and role
- Automatic password hashing with bcrypt

### Hotel Model
- Stores hotel information with address, amenities, pricing
- Includes images, ratings, and contact information
- Soft delete functionality (isActive flag)

### Destination Model
- Stores travel destinations with detailed information
- Includes attractions, activities, and climate data
- Text search capabilities

### Room Model
- Stores hotel room information
- Linked to hotels via hotelId
- Includes pricing and availability

### Booking Model
- Stores booking information
- Links users, hotels, and rooms
- Includes status tracking and pricing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get specific hotel
- `POST /api/hotels` - Create hotel (admin only)
- `PATCH /api/hotels/:id` - Update hotel (admin only)
- `DELETE /api/hotels/:id` - Delete hotel (admin only)

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `POST /api/destinations` - Create destination (admin only)
- `PATCH /api/destinations/:id` - Update destination (admin only)
- `DELETE /api/destinations/:id` - Delete destination (admin only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get specific booking
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

## Example Usage

### Creating a Hotel
```javascript
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

const response = await fetch('/api/hotels', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify(hotelData)
});
```

### Creating a Destination
```javascript
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

const response = await fetch('/api/destinations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify(destinationData)
});
```

### Creating a Booking
```javascript
const bookingData = {
  userId: 'user-id',
  hotelId: 'hotel-id',
  roomId: 'room-id',
  checkIn: '2024-06-15',
  checkOut: '2024-06-18',
  guests: 2,
  totalPrice: 600,
  status: 'pending',
  specialRequests: 'Late check-in requested'
};

const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  },
  body: JSON.stringify(bookingData)
});
```

## Database Operations

### Reading Data
```javascript
// Get all hotels
const hotels = await Hotel.find({ isActive: true });

// Get hotel by ID
const hotel = await Hotel.findById(id);

// Search hotels
const hotels = await Hotel.find({
  $or: [
    { name: { $regex: searchTerm, $options: 'i' } },
    { 'address.city': { $regex: searchTerm, $options: 'i' } }
  ],
  isActive: true
});
```

### Updating Data
```javascript
// Update hotel
const hotel = await Hotel.findById(id);
Object.assign(hotel, updateData);
await hotel.save();

// Update booking status
const booking = await Booking.findById(id);
booking.status = newStatus;
await booking.save();
```

### Deleting Data
```javascript
// Soft delete (recommended)
const hotel = await Hotel.findById(id);
hotel.isActive = false;
await hotel.save();

// Hard delete (use with caution)
await Hotel.findByIdAndDelete(id);
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Role-based access control (admin/user)
- Input validation with Mongoose schemas
- Environment variable configuration

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Duplicate key errors
- Authentication errors
- Database connection errors

## Performance Tips

- Use indexes for frequently queried fields
- Implement pagination for large datasets
- Use projection to limit returned fields
- Implement caching where appropriate 