import mongoose from "mongoose";

const conversationShema = new mongoose.Schema({
  first_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  seconde_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: String,
    default: "active",
  },
  lastMessage: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationShema);

export default Conversation;
