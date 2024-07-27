import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  messageId: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema({
  messageId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
