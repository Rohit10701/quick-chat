interface MessageEvent {
  message: string;
  senderId: string;
  receiverId: string;
  messageId: string;
  timestamp : string;
  status : "sent" | "recieved" | "seen";
  editAt : string | null
  
}

interface MessageToRoomEvent {
  message: string;
  senderId: string;
  receiverId: string;
  messageId: string;
  timestamp : string;
  status : "sent" | "recieved" | "seen";
  editAt : string | null
}

export {MessageEvent, MessageToRoomEvent}