require("dotenv").config();
const DATABASE_URI = process.env.DATABASE_URI;
const mongoose = require('mongoose');
const mongoURI = `mongodb://${DATABASE_URI}` ;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectToMongo;
