import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: 'quick-chat-app',
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET,
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
    groupId: "chats"
})

export const connectKafkaProducer = async () =>{
    await producer.connect();
    console.log("Kafka Producer connected...")
}