const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongoDbUri = process.env.mongo_uri

const connectToDb = async () => {
  try {
    const connected = await mongoose.connect(mongoDbUri)
    if(connected) {
      console.log("MonoDB Connected");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message)
  }
}

module.exports = connectToDb