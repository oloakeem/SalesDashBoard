import React from "react";
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Greetings = ({ label, onClick }: ButtonProps) => {
  return (
    <div>
      <h1>Hello {label}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default Greetings;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ButtonProps from "./components/Greetings";

function App() {
  return (
    <>
      <ButtonProps label={"John"} onClick={() => console.log("Yes?")} />
    </>
  );
}

export default App;
