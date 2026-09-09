"use client";

interface TextInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  startPractice: () => void;
}

export default function TextInput({ inputText, setInputText, startPractice }: TextInputProps) {
  const hasText = inputText.trim().length > 0;

  return (
    <div>
      <textarea
        className="w-full p-2 border rounded text-black"
        rows={10}
        placeholder="Enter text to memorize..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={startPractice}
        disabled={!hasText}
      >
        Start Practice
      </button>
    </div>
  );
}
