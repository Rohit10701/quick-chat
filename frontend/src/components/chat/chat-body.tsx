import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import FooterInput from './components/footer-input';
import { io, Socket } from 'socket.io-client';
import { selectChatSession } from '@/libs/redux/selectors/chat-session-selector';
import { useSelector } from 'react-redux';

interface Message {
  id: string;
  content: string;
}

const ChatBody: React.FC = () => {
  const chatSessionDetails = useSelector(selectChatSession);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket: Socket = io(`ws://localhost:3000?uid=${chatSessionDetails?.uid}`);
    setSocket(newSocket);

    console.log("connected")
    // Listen for incoming messages
    newSocket.on('message', (msg: string) => {
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), content: msg }]);
    });

    // Clean up WebSocket connection on component unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [chatSessionDetails?.uid]);

  const chatInputHandler = (value: string) => {
    setChatMessage(value);

    if (socket) {
      socket.emit('chat message', {message : value, sender});
    }
  };

  return (
    <div className='relative w-full'>
      <div className='absolute top-0 w-full'>
        <Navbar />
      </div>

      {/* Display messages */}
      <div className='mt-20 mb-20 px-4'>
        {messages.map((message) => (
          <div key={message.id} className='p-2 my-2 bg-gray-200 rounded-md'>
            {message.content}
          </div>
        ))}
      </div>

      <div className='absolute bottom-0 w-full py-2'>
        <FooterInput
          defaultValue={chatMessage}
          chatInputHandler={chatInputHandler}
        />
      </div>
    </div>
  );
};

export default ChatBody;
