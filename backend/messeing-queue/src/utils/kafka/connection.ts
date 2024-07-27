import { Kafka } from 'kafkajs';

export const createKafkaConsumer = (clientId: string, brokers: string[], groupId: string) => {
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId });
  return consumer;
};
