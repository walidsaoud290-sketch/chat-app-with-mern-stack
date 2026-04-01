import Message from "../models/Message.js";
import jwt from "jsonwebtoken";
export const get_messages = async (req, res) => {
  const token = req.cookies.access_token;
  const officialUser = jwt.verify(token, process.env.JWT_SECRET);

  const userMessage = req.body.userMessage;
  if (!officialUser) return;
  if (!userMessage) return;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: officialUser.id, receiverId: userMessage._id },
        { senderId: userMessage._id, receiverId: officialUser.id },
      ],
    });
    if (!messages)
      return res.status(200).json({
        message: "List messages Empty ",
      });
      console.log("not empty messages");
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error getting the messages :" + error);
  }
};

