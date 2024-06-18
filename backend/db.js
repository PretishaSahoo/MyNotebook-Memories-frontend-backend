const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI; 

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Handle the error appropriately (e.g., exit the application, retry the connection, etc.)
  }
};

module.exports = connectToMongo;
