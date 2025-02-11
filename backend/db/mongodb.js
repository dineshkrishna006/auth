import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// eslint-disable-next-line no-undef
const db_uri = process.env.DB_URI;

if (!db_uri) {
  throw new Error("Error with MongoDb env variable");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error connecting the Database:", error);
  }
};

export default connectToDatabase;
