import mongoose from "mongoose";

let isConnected = true;

export const connectToDB = () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already Connected to MongoDB");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptStar",
    });

    isConnected = true;
    console.log("MONGODB Connected");
  } catch (error) {
    console.error("Error connecting to MONGODB: ", error);
  }
};
