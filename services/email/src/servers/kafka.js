import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "email-server",
  brokers: ["localhost:9092"],
});

const admin = kafka.admin();
export const consumer = kafka.consumer({
  groupId: "group-sending-email",
});

export const connectToKafka = async () => {
  try {
    await admin.connect();
    console.log("Kafka connected successfuly");
  } catch (error) {
    console.log("Error connecting to kafka :" + error);
  }
};

export const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Consumer connected successfuly");
  } catch (error) {
    console.log("Error connecting consumer :" + error);
  }
};

export const lisTopics = async () => {
  try {
    await admin.listTopics().then(console.log);
  } catch (error) {
    console.log("Error listing :" + error);
  }
};
