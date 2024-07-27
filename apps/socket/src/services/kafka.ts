import { Kafka, Producer } from 'kafkajs';

interface KafkaMessage {
  message: string;
  senderId: string;
  receiverId: string;
  messageId: string;
  timestamp: string;
}

export class KafkaProducer {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'messaging-app',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  public async connect(): Promise<void> {
    try {
      await this.producer.connect();
      console.log('Kafka Producer connected');
    } catch (err) {
      console.error('Error connecting Kafka producer', err);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      console.log('Kafka Producer disconnected');
    } catch (err) {
      console.error('Error disconnecting Kafka producer', err);
    }
  }

  public async sendMessage(payload: KafkaMessage): Promise<void> {
    const { message, senderId, receiverId, messageId, timestamp } = payload;
    const kafkaTopic = 'messages';

    try {
      await this.producer.send({
        topic: kafkaTopic,
        messages: [{ value: JSON.stringify({ message, senderId, receiverId, messageId, timestamp }) }],
      });
      console.log('Message Sent successfully!');
    } catch (err) {
      console.error('Error sending message to Kafka', err);
    }
  }
}
