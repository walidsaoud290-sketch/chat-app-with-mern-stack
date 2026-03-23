import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-server",
  brokers: ["localhost:9092"],
});

const admin = kafka.admin();

/* const creatTopic = async () => {
  try {
    await admin.createTopics({
      topics: [
        {
          topic: "notification-message-chat",
          numPartitions: 3,
        },
      ],
    });
    console.log("Creation topic successfuly");
  } catch (error) {
    console.log("Erreur creating topic :" + error);
  }
}; */

/* const listTopics = async()=>{
    await admin.listTopics().then(console.log).catch(e=>console.log(e));
} */

export const connectToKafka = async () => {
  try {
    await admin.connect();
    console.log("Connecting To kafka successfuly");
  } catch (error) {
    console.log("Error connecting to Kafka :" + error);
  }
};
