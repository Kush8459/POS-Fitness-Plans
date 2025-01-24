const mongoose = require("mongoose");

// connectDB Function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected: ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`MongoDb connectionError: ${error.message}`.bgRed);
    process.exit(1);
  }
};

// export connectDB
module.exports = connectDB;
