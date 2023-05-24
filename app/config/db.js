const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://dnasre007:MhFpb4jj46Imutvx@cluster1997/hts-node?retryWrites=true&w=majority' || process.env.DATABASE;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectToMongo;
