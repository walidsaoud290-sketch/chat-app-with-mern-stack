import mongoose from "mongoose";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfuly");
  } catch (error) {
    console.log("Error connecting mongo db :" + error);
    process.exit(1);
  }
};
