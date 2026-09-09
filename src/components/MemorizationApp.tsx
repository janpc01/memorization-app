"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import Practice from "./Practice";

export default function MemorizationApp() {
  const [inputText, setInputText] = useState<string>("");
  const [lines, setLines] = useState<string[]>([]);
  const [practiceMode, setPracticeMode] = useState<boolean>(false);

  const startPractice = () => {
    const parsedLines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (parsedLines.length === 0) return;

    setLines(parsedLines);
    setPracticeMode(true);
  };

  const newText = () => {
    setPracticeMode(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {practiceMode ? (
        <Practice lines={lines} onNewText={newText} />
      ) : (
        <TextInput inputText={inputText} setInputText={setInputText} startPractice={startPractice} />
      )}
    </div>
  );
}
