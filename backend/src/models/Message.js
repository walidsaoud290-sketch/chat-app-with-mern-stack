import mongoose from "mongoose";

const MessageShema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageShema);
export default Message;
