# Database Storage Guide for Travel Agency

## Overview
This guide explains how to store and manage data in the MongoDB database for your travel agency application.

## Database Setup

### 1. Environment Configuration
Create a `.env` file in the backend root directory:

```env
MONGODB_URI=mongodb://localhost:27017/travel-agency
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-agency
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 2. Database Models

#### User Model
```javascript
// Stores user accounts (customers and admins)
{
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

#### Hotel Model
```javascript
// Stores hotel information
{
  name: String,
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  amenities: [String],
  images: [String],
  rating: Number (0-5),
  priceRange: {
    min: Number,
    max: Number
  },
  contactInfo: {
    phone: String,
    email: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Destination Model
```javascript
// Stores travel destinations
{
  name: String,
  country: String,
  city: String,
  description: String,
  shortDescription: String,
  images: [String],
  mainImage: String,
  rating: Number (0-5),
  price: Number,
  currency: String,
  climate: String,
  bestTimeToVisit: String,
  attractions: [{
    name: String,
    description: String,
    image: String
  }],
  activities: [String],
  isPopular: Boolean,
  isActive: Boolean,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Room Model
```javascript
// Stores hotel room information
{
  hotelId: ObjectId (ref: Hotel),
  roomNumber: String,
  type: String,
  capacity: Number,
  price: Number,
  amenities: [String],
  images: [String],
  isAvailable: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Booking Model
```javascript
// Stores booking information
{
  userId: ObjectId (ref: User),
  hotelId: ObjectId (ref: Hotel),
  roomId: ObjectId (ref: Room),
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: String (enum: ['pending', 'confirmed', 'cancelled']),
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Database Operations

### 1. Creating Records (POST)

#### Create a User
```javascript
// POST /api/auth/register
const newUser = new User({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user'
});
await newUser.save();
```

#### Create a Hotel
```javascript
// POST /api/hotels (admin only)
const newHotel = new Hotel({
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
});
await newHotel.save();
```

#### Create a Destination
```javascript
// POST /api/destinations (admin only)
const newDestination = new Destination({
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
});
await newDestination.save();
```

### 2. Reading Records (GET)

#### Get All Hotels
```javascript
// GET /api/hotels
const hotels = await Hotel.find({ isActive: true });
```

#### Get Hotel by ID
```javascript
// GET /api/hotels/:id
const hotel = await Hotel.findById(req.params.id);
```

#### Search Hotels
```javascript
// GET /api/hotels?search=grand
const hotels = await Hotel.find({
  $or: [
    { name: { $regex: searchTerm, $options: 'i' } },
    { 'address.city': { $regex: searchTerm, $options: 'i' } }
  ],
  isActive: true
});
```

#### Get Popular Destinations
```javascript
// GET /api/destinations?popular=true
const destinations = await Destination.find({ 
  isPopular: true, 
  isActive: true 
});
```

### 3. Updating Records (PUT/PATCH)

#### Update Hotel
```javascript
// PATCH /api/hotels/:id (admin only)
const hotel = await Hotel.findById(req.params.id);
Object.assign(hotel, req.body);
await hotel.save();
```

#### Update Booking Status
```javascript
// PATCH /api/bookings/:id/status
const booking = await Booking.findById(req.params.id);
booking.status = req.body.status;
await booking.save();
```

### 4. Deleting Records (DELETE)

#### Soft Delete Hotel
```javascript
// DELETE /api/hotels/:id (admin only)
const hotel = await Hotel.findById(req.params.id);
hotel.isActive = false;
await hotel.save();
```

#### Hard Delete (if needed)
```javascript
// DELETE /api/hotels/:id/hard (admin only)
await Hotel.findByIdAndDelete(req.params.id);
```

## Advanced Queries

### 1. Aggregation Pipeline
```javascript
// Get hotel statistics
const stats = await Hotel.aggregate([
  { $match: { isActive: true } },
  { $group: {
    _id: null,
    totalHotels: { $sum: 1 },
    avgRating: { $avg: '$rating' },
    avgPrice: { $avg: '$priceRange.min' }
  }}
]);
```

### 2. Population (Joins)
```javascript
// Get bookings with user and hotel details
const bookings = await Booking.find()
  .populate('userId', 'firstName lastName email')
  .populate('hotelId', 'name address.city')
  .populate('roomId', 'roomNumber type');
```

### 3. Text Search
```javascript
// Search destinations by text
const destinations = await Destination.find({
  $text: { $search: searchTerm }
}, {
  score: { $meta: 'textScore' }
}).sort({ score: { $meta: 'textScore' } });
```

## Error Handling

### 1. Validation Errors
```javascript
try {
  const hotel = new Hotel(hotelData);
  await hotel.save();
} catch (error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: Object.values(error.errors).map(err => err.message)
    });
  }
  throw error;
}
```

### 2. Duplicate Key Errors
```javascript
try {
  const user = new User(userData);
  await user.save();
} catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({
      message: 'Email already exists'
    });
  }
  throw error;
}
```

## Best Practices

### 1. Indexing
- Create indexes for frequently queried fields
- Use compound indexes for complex queries
- Add text indexes for search functionality

### 2. Data Validation
- Use Mongoose schemas for validation
- Implement custom validation functions
- Sanitize user input

### 3. Security
- Hash passwords before storing
- Use environment variables for sensitive data
- Implement proper authentication middleware

### 4. Performance
- Use pagination for large datasets
- Implement caching where appropriate
- Use projection to limit returned fields

## Example API Endpoints

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get specific hotel
- `POST /api/hotels` - Create hotel (admin)
- `PATCH /api/hotels/:id` - Update hotel (admin)
- `DELETE /api/hotels/:id` - Delete hotel (admin)

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `POST /api/destinations` - Create destination (admin)
- `PATCH /api/destinations/:id` - Update destination (admin)
- `DELETE /api/destinations/:id` - Delete destination (admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get specific booking
- `POST /api/bookings` - Create booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Users
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/profile` - Update profile 