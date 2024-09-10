import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true,
});

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
      console.log('Message received from server:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup when component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    // Emit the message to the server
    socket.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage(''); // Clear input after sending
  };

  return (
    <div className="App">
      <h1>Real-time Game Chat</h1>
      <div>
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message" 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <button onClick={() => console.log(messages)}>Log messages</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;