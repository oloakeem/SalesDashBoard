// src/App.tsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import HeapSortComponent from "../Components/HeapSortComponent";

const socket = io("http://localhost:4000");
interface diceObjectProps {
  name?: string;
  diceRoll: number;
  priority: boolean;
}
const App: React.FC<diceObjectProps> = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [maxHeap, setMaxHeap] = useState<number[]>([]);
  const [count, setCount] = useState(0);
  const [diceObject, setDiceObject] = useState<diceObjectProps[]>([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      // Cleanup the socket connection on component unmount
      socket.off("message");
    };
  }, []);

  const sendMessage = (NorG: boolean) => {
    let type = NorG ? "Need" : "Greed";
    const roll = Math.floor(Math.random() * 101); // Generate random number

    const newDiceObject = {
      name: socket.id?.toString(),
      diceRoll: roll,
      priority: NorG, // Priority is set based on NorG
    };

    // Emit message to server
    socket.emit("message", `${socket.id} rolled ${type} and got ${roll}`);

    // Update maxHeap and diceObject states
    setMaxHeap((prevHeap) => [...prevHeap, roll]);
    setCount(count + 1); // Increment count to disable the buttons
    setDiceObject((prevDiceObjects) => [...prevDiceObjects, newDiceObject]); // Append new object to array
  };

  return (
    <div>
      <h1>Socket.io Chat</h1>
      <button disabled={count > 0} onClick={() => sendMessage(true)}>
        Need
      </button>
      <button disabled={count > 0} onClick={() => sendMessage(false)}>
        Greed
      </button>
      <h2>Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <h2>Current Roll:</h2>
      <ul>
        {diceObject.map((diceObject, index) => (
          <li key={index}>
            Name:{diceObject.name}, Roll:{diceObject.diceRoll}, Priority:
            {diceObject.priority ? "Need" : "Greed"}
          </li>
        ))}
      </ul>
      <ul>
        <HeapSortComponent inputArray={maxHeap} />
      </ul>
    </div>
  );
};

export default App;
