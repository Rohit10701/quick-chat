import { Server as SocketIOServer, Socket } from 'socket.io';
import { KafkaProducer } from './kafka';
import { RedisClient } from './redis';
import { MessageEvent, MessageToRoomEvent } from '../types';



export class SocketHandler {
  private io: SocketIOServer;
  private kafkaProducer: KafkaProducer;
  private redisClient: RedisClient;
  private serverInstanceId: number = 1;

  constructor(io: SocketIOServer, kafkaProducer: KafkaProducer, redisClient: RedisClient) {
    this.io = io;
    this.kafkaProducer = kafkaProducer;
    this.redisClient = redisClient;
  }

  public init(): void {
    this.io.on('connection', (socket: Socket) => this.handleConnection(socket));
  }

  private handleConnection(socket: Socket): void {
    console.log('A user connected', socket.handshake.query);

    socket.on('message', (mEvent: MessageEvent) => this.handleSendMessageToKafka(mEvent));
    socket.on('messageToRoom', (mEvent: MessageToRoomEvent) => this.handleMessageToRoom(socket, mEvent));
    socket.on('disconnect', () => this.handleDisconnect());

    const userId = socket.handshake.query.uid as string;
    socket.join(userId);

    // could used to check if 
    if (userId && this.serverInstanceId) {
      this.redisClient.set(userId, JSON.stringify({ serverInstanceId: this.serverInstanceId }));
      console.log(userId, this.serverInstanceId);
    }

    console.log(socket.rooms);
  }

  private async handleSendMessageToKafka(mEvent: MessageEvent): Promise<void> {
    console.log('Message event', mEvent);

    const { message, senderId, receiverId, messageId } = mEvent;
    await this.kafkaProducer.sendMessage({
      message,
      senderId,
      receiverId,
      messageId,
      timestamp: new Date().toISOString(),
    });
  }

  private handleMessageToRoom(socket: Socket, mEvent: MessageToRoomEvent): void {
    console.log('Message event Room', mEvent);

    const { receiverId } = mEvent;
    socket.to(receiverId).emit('message', mEvent);
    console.log("Socket sent!!!");
  }

  private handleDisconnect(): void {
    console.log('User disconnected');
  }
}
