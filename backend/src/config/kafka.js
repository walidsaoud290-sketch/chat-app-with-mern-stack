import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-server",
  brokers: ["localhost:9092"],
});

export const admin = kafka.admin();
export const producer = kafka.producer();

export const ConnectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer connected successfuly");
  } catch (error) {
    console.log("Error connecting producer :" + error);
  }
};

export const creatTopic = async () => {
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: "sensors_road",
          numPartitions: 3,
        },
        {
          topic: "sensors_wheather",
          numPartitions: 3,
        },
        {
          topic: "sensors_vehicules",
        },
      ],
    });
    console.log("Creation topic successfuly");
    await admin.disconnect();
  } catch (error) {
    console.log("Erreur creating topic :" + error);
  }
};

export const creatTopicMessages = async () => {
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: "email-successful",
          numPartitions: 3,
        },
      ],
    });
    console.log("Created topic email-successful");
    await admin.disconnect();
  } catch (error) {
    console.log("Error created topic :" + error);
  }
};

export const listTopics = async () => {
  await admin
    .listTopics()
    .then(console.log)
    .catch((e) => console.log(e));
};

export const connectToKafka = async () => {
  try {
    await admin.connect();
    console.log("Connecting To kafka successfuly");
  } catch (error) {
    console.log("Error connecting to Kafka :" + error);
  }
};
