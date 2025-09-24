import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChatBox from "./components/chatbox";
import EnterBox from "./components/EnterBox";
import { connectWS } from "./ws";

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
}

function App() {
  const [name, setName] = useState<String | null>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const handleSetName = (newName: string) => {
    setName(newName);
    socket.current.emit('joinRoom', newName);
  };
  
  const socket = useRef<any>(null);
  useEffect(() => {
    socket.current = connectWS();

    socket.current.on("connect", () => {
      console.log("connected to server");
      socket.current.on('roomNotice', (userName: string) => {
        console.log(`${userName} has joined the room.`);
      });
      socket.current.on('chatMessage', (msg: Message) => {
        console.log(`New message:`);
        console.log({msg});
        setMessages( prev => [
          ...prev,
           msg
        ])
      });
    });
    socket.current.on("disconnect", () => {
      console.log("disconnected from server");
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "var(--primary-brown)",
        color: "var(--primary-brown)",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {name ? (
        <ChatBox 
          name={name} 
          messages={messages} 
          setMessages={setMessages}
          socket={socket}/>
      ) : (
        <EnterBox name={name} setName={handleSetName} />
      )}
    </div>
  );
}

export default App;
