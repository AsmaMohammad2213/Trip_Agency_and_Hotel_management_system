// Database Service - Frontend integration with backend API
// This file shows how to store and retrieve data from the database

import { auth, hotels, destinations, bookings } from './api';

export interface DatabaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseHotel {
  _id: string;
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseDestination {
  _id: string;
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseBooking {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

class DatabaseService {
  // User Operations
  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<DatabaseUser> {
    try {
      const response = await auth.register(userData);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<{ user: DatabaseUser; token: string }> {
    try {
      const response = await auth.login(credentials);
      return response;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<DatabaseUser> {
    try {
      const response = await auth.getCurrentUser();
      return response;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  // Hotel Operations
  async getAllHotels(): Promise<DatabaseHotel[]> {
    try {
      const response = await hotels.getAll();
      return response;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  }

  async getHotelById(id: string): Promise<DatabaseHotel> {
    try {
      const response = await hotels.getById(id);
      return response;
    } catch (error) {
      console.error('Error fetching hotel:', error);
      throw error;
    }
  }

  async createHotel(hotelData: Omit<DatabaseHotel, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseHotel> {
    try {
      const response = await hotels.create(hotelData);
      return response;
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw error;
    }
  }

  async updateHotel(id: string, hotelData: Partial<DatabaseHotel>): Promise<DatabaseHotel> {
    try {
      const response = await hotels.update(id, hotelData);
      return response;
    } catch (error) {
      console.error('Error updating hotel:', error);
      throw error;
    }
  }

  async deleteHotel(id: string): Promise<void> {
    try {
      await hotels.delete(id);
    } catch (error) {
      console.error('Error deleting hotel:', error);
      throw error;
    }
  }

  // Destination Operations
  async getAllDestinations(): Promise<DatabaseDestination[]> {
    try {
      const response = await destinations.getAll();
      return response;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  }

  async getDestinationById(id: string): Promise<DatabaseDestination> {
    try {
      const response = await destinations.getById(id);
      return response;
    } catch (error) {
      console.error('Error fetching destination:', error);
      throw error;
    }
  }

  async createDestination(destinationData: Omit<DatabaseDestination, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseDestination> {
    try {
      const response = await destinations.create(destinationData);
      return response;
    } catch (error) {
      console.error('Error creating destination:', error);
      throw error;
    }
  }

  async updateDestination(id: string, destinationData: Partial<DatabaseDestination>): Promise<DatabaseDestination> {
    try {
      const response = await destinations.update(id, destinationData);
      return response;
    } catch (error) {
      console.error('Error updating destination:', error);
      throw error;
    }
  }

  async deleteDestination(id: string): Promise<void> {
    try {
      await destinations.delete(id);
    } catch (error) {
      console.error('Error deleting destination:', error);
      throw error;
    }
  }

  // Booking Operations
  async getAllBookings(): Promise<DatabaseBooking[]> {
    try {
      const response = await bookings.getAll();
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async getBookingById(id: string): Promise<DatabaseBooking> {
    try {
      const response = await bookings.getById(id);
      return response;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  }

  async createBooking(bookingData: Omit<DatabaseBooking, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseBooking> {
    try {
      const response = await bookings.create(bookingData);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<DatabaseBooking> {
    try {
      const response = await bookings.updateStatus(id, status);
      return response;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  async cancelBooking(id: string): Promise<void> {
    try {
      await bookings.cancel(id);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  }

  // Search and Filter Operations
  async searchHotels(query: string): Promise<DatabaseHotel[]> {
    try {
      const response = await hotels.search(query);
      return response;
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  }

  async getPopularDestinations(): Promise<DatabaseDestination[]> {
    try {
      const response = await destinations.getPopular();
      return response;
    } catch (error) {
      console.error('Error fetching popular destinations:', error);
      throw error;
    }
  }

  async getBookingsByUser(userId: string): Promise<DatabaseBooking[]> {
    try {
      const response = await bookings.getByUser(userId);
      return response;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }

  // Statistics and Analytics
  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalHotels: number;
    totalDestinations: number;
    totalBookings: number;
    revenue: number;
    pendingBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
  }> {
    try {
      // This would typically come from a dedicated stats endpoint
      const [users, hotels, destinations, bookings] = await Promise.all([
        this.getAllHotels(),
        this.getAllDestinations(),
        this.getAllBookings()
      ]);

      const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
      const pendingBookings = bookings.filter(b => b.status === 'pending');
      const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
      const revenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

      return {
        totalUsers: 0, // Would need user count endpoint
        totalHotels: hotels.length,
        totalDestinations: destinations.length,
        totalBookings: bookings.length,
        revenue,
        pendingBookings: pendingBookings.length,
        confirmedBookings: confirmedBookings.length,
        cancelledBookings: cancelledBookings.length
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const databaseService = new DatabaseService();

// Example usage functions
export const exampleUsage = {
  // Example: Create a new hotel
  async createNewHotel() {
    try {
      const newHotel = await databaseService.createHotel({
        name: 'New Luxury Hotel',
        description: 'A brand new luxury hotel with amazing amenities',
        address: {
          street: '123 Luxury Lane',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
          zipCode: '90210'
        },
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        images: ['https://example.com/hotel1.jpg', 'https://example.com/hotel2.jpg'],
        rating: 4.5,
        priceRange: {
          min: 300,
          max: 800
        },
        contactInfo: {
          phone: '+1-555-0123',
          email: 'info@newluxuryhotel.com'
        },
        isActive: true
      });
      console.log('Created hotel:', newHotel);
      return newHotel;
    } catch (error) {
      console.error('Failed to create hotel:', error);
      throw error;
    }
  },

  // Example: Create a new destination
  async createNewDestination() {
    try {
      const newDestination = await databaseService.createDestination({
        name: 'Barcelona',
        country: 'Spain',
        city: 'Barcelona',
        description: 'Vibrant city known for its architecture, culture, and Mediterranean lifestyle',
        shortDescription: 'Vibrant Spanish city with amazing architecture',
        images: ['https://example.com/barcelona1.jpg', 'https://example.com/barcelona2.jpg'],
        mainImage: 'https://example.com/barcelona-main.jpg',
        rating: 4.7,
        price: 900,
        currency: 'USD',
        climate: 'mediterranean',
        bestTimeToVisit: 'Spring and Fall',
        attractions: [
          {
            name: 'Sagrada Familia',
            description: 'Famous unfinished church by Antoni Gaudí',
            image: 'https://example.com/sagrada-familia.jpg'
          }
        ],
        activities: ['Architecture Tours', 'Beach Activities', 'Food Tours', 'Shopping'],
        isPopular: true,
        isActive: true
      });
      console.log('Created destination:', newDestination);
      return newDestination;
    } catch (error) {
      console.error('Failed to create destination:', error);
      throw error;
    }
  },

  // Example: Create a new booking
  async createNewBooking() {
    try {
      const newBooking = await databaseService.createBooking({
        userId: 'user-id-here',
        hotelId: 'hotel-id-here',
        roomId: 'room-id-here',
        checkIn: '2024-06-15T00:00:00.000Z',
        checkOut: '2024-06-18T00:00:00.000Z',
        guests: 2,
        totalPrice: 600,
        status: 'pending',
        specialRequests: 'Late check-in requested'
      });
      console.log('Created booking:', newBooking);
      return newBooking;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  }
}; 