"use client";

import { useState, useEffect } from "react";

interface PracticeProps {
  lines: string[];
}

export default function Practice({ lines }: PracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctLines, setCorrectLines] = useState<string[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Store elapsed time in seconds
  const [finalTime, setFinalTime] = useState<number | null>(null); // Store final time
  const [hasStarted, setHasStarted] = useState(false); // Track if the user clicked start
  const [inputWidth, setInputWidth] = useState<number>(20); // Track input width dynamically

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      if (target.value.trim() === lines[currentIndex]) {
        setCorrectLines([...correctLines, lines[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
        target.value = ""; // Clear input
      }
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setHasStarted(true); // Mark that the user has clicked start
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 0.1); // Increment by 0.1 seconds
      }, 100); // Update every 100ms (0.1 seconds)
    }

    // Cleanup interval on unmount or when the timer stops
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (currentIndex === lines.length) {
      setIsTimerRunning(false); // Stop timer when the last line is submitted
      setFinalTime(elapsedTime); // Save final time
    }
  }, [currentIndex, lines.length, elapsedTime]);

  // Calculate the max width based on the longest line in the array or a minimum of 20 characters
  useEffect(() => {
    const maxWidth = Math.max(
      20, // Minimum width is 20 characters
      ...lines.map((line) => line.length)
    );
    setInputWidth(maxWidth); // Set the width for the input
  }, [lines]);

  return (
    <div>
      <div className="border p-2 min-h-[100px] bg-gray-100 rounded">
        {correctLines.map((line, index) => (
          <p key={index} className="text-green-700">{line}</p>
        ))}
      </div>

      {isTimerRunning && (
        <p className="mt-2 text-gray-600">
          Time: {elapsedTime.toFixed(1)} seconds
        </p>
      )}

      {hasStarted && currentIndex < lines.length ? (
        <input
          className="mt-2 p-2 border rounded text-black"
          placeholder="Type the next line..."
          onKeyDown={handleInput}
          style={{ width: `${inputWidth * 8}px` }} // Multiply by 8px per character width for better scaling
        />
      ) : (
        <>
          {hasStarted && currentIndex === lines.length && (
            <p className="mt-2 text-green-500">You memorized the full text!</p>
          )}
          {finalTime !== null && (
            <p className="mt-2 text-blue-500">Total time: {finalTime.toFixed(1)} seconds</p>
          )}
        </>
      )}

      {!isTimerRunning && !hasStarted && (
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={startTimer}
        >
          Start
        </button>
      )}
    </div>
  );
}
