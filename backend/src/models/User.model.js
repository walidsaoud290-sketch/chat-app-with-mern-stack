import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});
