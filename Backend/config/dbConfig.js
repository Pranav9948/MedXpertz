const mongoose = require("mongoose");

const MONGO_URL="mongodb+srv://Pranav:Pranav1!@shoplifter.k1oygu5.mongodb.net/MedXpertz"

mongoose.connect(MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;
