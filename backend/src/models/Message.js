import mongoose from "mongoose";

const MessageShema = new mongoose.Schema({
  conversation_id: {
    type: String,
  },
  message: {
    type: String,
  },
  sender: {
    type: String,
  },
});

const Message = new mongoose.model("Message", MessageShema);
export default Message;
