import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChatBox from "./components/chatbox";
import EnterBox from "./components/EnterBox";
import { connectWS } from "./ws";

function App() {
  const socket = useRef<any>(null);
  const [name, setName] = useState<String | null>("");
  const handleSetName = (newName: string) => {
    setName(newName);
  };

  useEffect(() => {
    socket.current = connectWS();

    socket.current.on("connect", () => {
      console.log("connected to server");
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
        <ChatBox name={name} />
      ) : (
        <EnterBox name={name} setName={handleSetName} />
      )}
    </div>
  );
}

export default App;
