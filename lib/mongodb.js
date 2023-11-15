import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add variable: "MONGODB_URI" to .env.local file');
}

const uri = process.env.MONGODB_URI;
const options = {}; 

const connectMongoDB = async () => {
  try {
    mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
  }
};

export default connectMongoDB; 