const mongoose = require('mongoose');

// Use MongoDB Atlas free cluster instead of local MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://travelease:travelease123@cluster0.mongodb.net/travelease?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 