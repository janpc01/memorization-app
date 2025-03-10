"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import Practice from "./Practice";

export default function MemorizationApp() {
  const [inputText, setInputText] = useState<string>("");
  const [lines, setLines] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  const startPractice = () => {
    setLines(inputText.split("\n").map(line => line.trim())); // Trim whitespace
    setPracticeMode(true);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {!practiceMode ? (
        <TextInput inputText={inputText} setInputText={setInputText} startPractice={startPractice} />
      ) : (
        <Practice lines={lines} />
      )}
    </div>
  );
}
