"use client";

interface TextInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  startPractice: () => void;
}

export default function TextInput({ inputText, setInputText, startPractice }: TextInputProps) {
  return (
    <div>
      <textarea
        className="w-full p-2 border rounded text-black"
        rows={10}
        placeholder="Enter text to memorize..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={startPractice}>
        Start Practice
      </button>
    </div>
  );
}

// If you can keep your head when all about you   
// Are losing theirs and blaming it on you,   
// If you can trust yourself when all men doubt you,
// But make allowance for their doubting too;   
// If you can wait and not be tired by waiting,
// Or being lied about, don't deal in lies,
// Or being hated, don't give way to hating,
// And yet don't look too good, nor talk too wise: