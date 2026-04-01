import Message from "../../models/Message.js"
export const insert_messages = async(officialUser,userMessage,content)=>{
    try {
       const newMessage = new Message({
            senderId:officialUser,
            receiverId:userMessage,
            message:content
       });
       newMessage.save();
       console.log("Inserted messages successfuly");
    } catch (error) {
        throw new Error("Error inserting the data "+error);
    }
    
}