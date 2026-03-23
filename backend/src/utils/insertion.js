import { Kafka } from "kafkajs";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const kafka = new Kafka({
  clientId: "insertion-server",
  brokers: ["localhost:9092"],
});

export const InsertionData = async (data) => {
  try {
    if (!data) return;

    const { content, send_by, send_to } = data;

    let conversation = await Conversation.findOne({
      $or: [
        {
          first_user_id: send_by,
          seconde_user_id: send_to,
        },
        {
          first_user_id: send_to,
          seconde_user_id: send_by,
        },
      ],
    });
    if (!conversation) {
      conversation = new Conversation({
        first_user_id: send_by,
        second_user_id: send_to,
        lastMessage: content,
      });
      await conversation.save();
      console.log("Insertion to conversation successfuly");
    } else {
      conversation.lastMessage = content;
      conversation.dateTime = new Date();
      await conversation.save();
    }

    const message = new Message({
      conversation_id: conversation._id,
      senderId: send_by,
      message: content,
    });
    await message.save();
    console.log("Insertion to Message successfuly");
  } catch (error) {
    console.log("Error inserting to conversion :" + error);
  }
};
