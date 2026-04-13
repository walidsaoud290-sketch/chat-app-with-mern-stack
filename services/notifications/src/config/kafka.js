import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const admin = kafka.admin();
export const consumer = kafka.consumer({
    groupId:"receive_notification",
});

export const connectionToKafka = async () => {
  try {
    await admin.connect();
    console.log("Connected admin to kafka successffuly");
  } catch (error) {
    console.log("Error connecting to kafka :" + error);
  }
};

export const connectionConsumer = async()=>{
    try {
        await consumer.connect();
        console.log("Consumer connected");
    } catch (error) {
        console.log("Error consumer :"+error);
    }
}
